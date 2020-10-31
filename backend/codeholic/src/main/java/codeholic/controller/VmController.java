package codeholic.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import codeholic.domain.Response;
import codeholic.domain.SocketMessage;
import codeholic.domain.VmStatus;
import codeholic.service.JwtUtil;
import codeholic.service.OpenStackApiService;
import codeholic.service.RedisUtil;

@RestController
@RequestMapping("vm")
@CrossOrigin(origins = "*")
public class VmController {
    // TODO: 시간표시
    
    @Value("${openstackDomain}")
    private String openstackDomain;
    
    @Autowired
    private JwtUtil jwtUtil;

    // 레디스에 토큰을 idOpenstack 으로 저장
    @Autowired
    OpenStackApiService openStackApiService;

    @Autowired
    RedisUtil redisUtil;
    Logger logger = LoggerFactory.getLogger(VmController.class);

    // TODO: idOpenstack의 유효시간이 지나면 어떡할 것인가? - 다시 signin 해서 받아야지 뭐...

    // 이미 만든 사용자라면... 그냥 도메인에 url을 추가하면 되지 않을까?
    // vm 삭제하기
    @GetMapping("/create")
    public Response createVm(HttpServletRequest httpServletRequest,HttpServletResponse res) {

        Response response = new Response();
        final String accessJwtHeader = httpServletRequest.getHeader("Authorization");

        // 이전에 만든적 있다면 빠꾸하는 로직이 필요하다...
        try {
            if (accessJwtHeader == null)
                throw new Exception();
            String username = jwtUtil.getUsername(accessJwtHeader.substring(7));
            String authenticationToken = redisUtil.getData(username + "Openstack");
            openStackApiService.createVm(username, authenticationToken);
            response.setMessage("vm 생성중입니다");
        } catch (Exception e) {
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setResponse("fail");
            response.setMessage("vm 생성실패");
        }        
        return response;
    }
    
    @MessageMapping("/check")
    @SendTo("/topic/check")
    public SocketMessage broadCast(SocketMessage message,HttpServletResponse res) {

        SocketMessage result = new SocketMessage();

        // 메세지에 데이터 넣어서 보내줘야지 -> 이거 파싱
        String username = message.getData();
        String authenticationToken = redisUtil.getData(username + "Openstack");
        // vm상태 체크해서 데이터 담아서 보내줘야지
        int count;
        try {
            // 0. vm이 존재 하기는 하냐?
            count = openStackApiService.getUserInstanceCount(username, authenticationToken);
            if(count == 0){
                result.setStatus("fail");
                result.setData("NoVm");
                return result;
            }
            String instanceId= openStackApiService.getUserInstanceId(username, authenticationToken);
            VmStatus status = openStackApiService.getInstanceStatus(authenticationToken, instanceId);
        

            if(status.equals("active")){
                //유동 아이피 없음?
                if(status.getFloatingIp() == 0){
                    String fixedIpAddress =openStackApiService.getFixedIpAddress(authenticationToken,"55ae077d-a0d5-45f8-8408-0c1f2abf27fd");
                    String portId = openStackApiService.getPortId(authenticationToken,fixedIpAddress);
                    String floatingNetworkId =openStackApiService.getFloatingNetworkId(authenticationToken);
                    String floatingIp = openStackApiService.assignFloatingIp(floatingNetworkId,fixedIpAddress, portId, authenticationToken);
                    openStackApiService.getCodeServer(authenticationToken, floatingIp, username);
                }
                // 유동 아이피 할당 이후 success 메세지
                String url = openstackDomain+":8989/"+username;
                result.setStatus("success");
                result.setData(url+"\\"+status.getStatus()+"\\"+status.getLaunch()+"\\"+status.getTerminate());
                return result;
                // 이때는 리퀘스트 못받게 해야하는데... 유동아이피 계속 바뀌면 안되자너
            }
        } catch (IOException e) {
            result.setStatus("error");
            result.setData(null);
            return result;
        }
        result.setStatus("fail");
        result.setData("loading");
        res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return result;
    }
}

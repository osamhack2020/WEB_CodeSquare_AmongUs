package codeholic.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import codeholic.domain.SocketMessage;
import codeholic.domain.VmStatus;
import codeholic.service.JwtUtil;
import codeholic.service.OpenStackApiService;
import codeholic.service.RedisUtil;

// https://velog.io/@skyepodium/vue-spring-boot-stomp-%EC%9B%B9%EC%86%8C%EC%BC%93
@Controller
@RequestMapping("vm")
@CrossOrigin(origins = "*")
public class SockerController {
    private String openstackDomain="http://stack.codesquare.space";
    
    // 레디스에 토큰을 idOpenstack 으로 저장
    @Autowired
    OpenStackApiService openStackApiService;

    @Autowired
    RedisUtil redisUtil;
    Logger logger = LoggerFactory.getLogger(VmController.class);

    
    @MessageMapping("/receive")
    @SendTo("/send")
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
                String url = "https://ide.codesquare.space/"+username;
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

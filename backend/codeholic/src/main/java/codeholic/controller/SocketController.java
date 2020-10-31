package codeholic.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import codeholic.domain.Response;
import codeholic.domain.SocketMessage;
import codeholic.domain.SocketStatusMessage;
import codeholic.domain.User;
import codeholic.domain.VmStatus;
import codeholic.service.AuthService;
import codeholic.service.OpenStackApiService;
import codeholic.service.RedisUtil;

// https://velog.io/@skyepodium/vue-spring-boot-stomp-%EC%9B%B9%EC%86%8C%EC%BC%93
@RestController
@RequestMapping("vm")
@CrossOrigin(origins = "*")
public class SocketController {
    private String openstackDomain="http://stack.codesquare.space";
    
    // 레디스에 토큰을 idOpenstack 으로 저장
    @Autowired
    OpenStackApiService openStackApiService;

    @Autowired
    AuthService authService;
    @Autowired
    RedisUtil redisUtil;
    Logger logger = LoggerFactory.getLogger(VmController.class);

    @GetMapping("/get")
    public Response getInfo(HttpServletRequest req, HttpServletResponse res) throws IOException {
        
        Response response = new Response();
        SocketMessage result = new SocketMessage();
        
        try{
            final String accessJwtHeader = req.getHeader("Authorization"); 
            User user = authService.findByToken(accessJwtHeader);
            String username = user.getUsername();
            String authenticationToken = redisUtil.getData(username + "Openstack");
            //현재 vm이 존재하냐
            if(openStackApiService.getUserInstanceCount(username, authenticationToken)!=0){
                //존재 함
                String instanceId = openStackApiService.getUserInstanceId(username, authenticationToken);
                VmStatus status = openStackApiService.getInstanceStatus(authenticationToken, instanceId);
                if(status.getFloatingIp() != 0){
                    //유동 아이피 할당 이미 됨
                    result.getData().setUrl("https://ide.codesquare.space/"+username);
                    response.setMessage("vm 생성 완료");
                }else{
                    //유동 아이피 할당이 안됨
                    openStackApiService.afterCreate(authenticationToken, username);
                    result.setStatus("loading");
                    response.setMessage("vm 생성중");
                }
                result.getData().setCreated_at(status.getLaunch());
                result.getData().setLatest(status.getTerminate());
                
            }else{
                // vm 생성이 안됨
                response.setResponse("loading");
                response.setMessage("vm이 생성중");
            }
            response.setData(result);
                
        }catch(Exception e){
            response.setMessage("VM 조회 실패");
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setResponse("fail");
        }
        return response;
    }
    @PostMapping("/create")
    public Response createVm(HttpServletRequest req, HttpServletResponse res){
        Response response = new Response();
        SocketMessage socketMessage = new SocketMessage();
        try{
            final String accessJwtHeader = req.getHeader("Authorization"); 
            User user = authService.findByToken(accessJwtHeader);
            String username = user.getUsername();
            String authenticationToken = redisUtil.getData(username + "Openstack");
            // 이미 있다면 삭제
            openStackApiService.createVm(username, authenticationToken);
            response.setMessage("vm 생성중");
            socketMessage.setStatus("loading");
        }catch(Exception e){
            response.setResponse("fail");
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setMessage("vm 생성 실패");
        }
        response.setData(socketMessage);
        return response;
    }
    @DeleteMapping("/delete")
    public Response deleteVm(HttpServletRequest req, HttpServletResponse res){
        Response response = new Response();
        SocketMessage socketMessage = new SocketMessage();
        try{
            final String accessJwtHeader = req.getHeader("Authorization"); 
            User user = authService.findByToken(accessJwtHeader);
            String username = user.getUsername();
            String authenticationToken = redisUtil.getData(username + "Openstack");
            String instanceId = openStackApiService.getUserInstanceId(username, authenticationToken);
            openStackApiService.deleteVm(authenticationToken, instanceId);
            response.setMessage("vm 삭제중");
            socketMessage.setStatus("success");
        }catch(Exception e){
            response.setResponse("fail");
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setMessage("vm 삭제 실패");
        }
        response.setData(socketMessage);
        return response;
    }

    @MessageMapping("/receive")
    @SendTo("/send")
    public SocketMessage test(SocketMessage message) {

        SocketMessage result = new SocketMessage();
        result.setStatus("success");
        return result;
    }
    @MessageMapping("/status")
    @SendTo("/send")
    public SocketMessage viewStatus(SocketStatusMessage message){
        SocketMessage result = new SocketMessage();
        final String accessJwtHeader = message.getAccessToken();
        try{
            User user = authService.findByToken(accessJwtHeader);
            String username = user.getUsername();
            String authenticationToken = redisUtil.getData(username + "Openstack");
            //현재 vm이 존재하냐
            if(openStackApiService.getUserInstanceCount(username, authenticationToken)!=0){
                //존재 함
                String instanceId = openStackApiService.getUserInstanceId(username, authenticationToken);
                VmStatus status = openStackApiService.getInstanceStatus(authenticationToken, instanceId);
                if(status.getFloatingIp() != 0){
                    // 유동 아이피 존재
                    result.setStatus("ready");
                    result.getData().setUrl("https://ide.codesquare.space/"+username);
                }
                else{
                    // 유동 아이피 없음
                    result.setStatus("loading");
                    openStackApiService.afterCreate(authenticationToken, username);
                }
                result.getData().setCreated_at(status.getLaunch());
                result.getData().setLatest(status.getTerminate());
                return result;
            }
        }catch(Exception e){
            result.setStatus("loading");
        }
        return result;
    }
}

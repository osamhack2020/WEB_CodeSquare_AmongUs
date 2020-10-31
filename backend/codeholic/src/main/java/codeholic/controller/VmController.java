package codeholic.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import codeholic.domain.Response;
import codeholic.service.JwtUtil;
import codeholic.service.OpenStackApiService;
import codeholic.service.RedisUtil;

@RestController
@RequestMapping("vm")
@CrossOrigin(origins = "*")
public class VmController {
    
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

        try {
            if (accessJwtHeader == null)
                throw new Exception();
            String username = jwtUtil.getUsername(accessJwtHeader.substring(7));
            String authenticationToken = redisUtil.getData(username + "Openstack");
            if(openStackApiService.getUserInstanceCount(username, authenticationToken)!=0){
                String tmp = openStackApiService.getUserInstanceId(username, authenticationToken);
                openStackApiService.deleteVm(authenticationToken, tmp);
            }
            openStackApiService.createVm(username, authenticationToken);
            response.setMessage("vm 생성중입니다");
        } catch (Exception e) {
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setResponse("fail");
            response.setMessage("vm 생성실패");
        }        
        return response;
    }
    @DeleteMapping("/delete")
    public Response deleteVm(HttpServletRequest httpServletRequest,HttpServletResponse res) {

        Response response = new Response();
        final String accessJwtHeader = httpServletRequest.getHeader("Authorization");

        // 이전에 만든적 있다면 빠꾸하는 로직이 필요하다...

        try {
            if (accessJwtHeader == null)
                throw new Exception();
            String username = jwtUtil.getUsername(accessJwtHeader.substring(7));
            String authenticationToken = redisUtil.getData(username + "Openstack");
            String instanceId = openStackApiService.getUserInstanceId(username, authenticationToken);
            openStackApiService.deleteVm(authenticationToken, instanceId);
            response.setMessage("vm 삭제 성공");
        } catch (Exception e) {
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setResponse("fail");
            response.setMessage("vm 삭제 실패");
        }        
        return response;
    }
}

package codeholic.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.jni.Time;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import codeholic.domain.Board;
import codeholic.domain.Tag;
import codeholic.domain.VmStatus;
import codeholic.service.BoardService;
import codeholic.service.JwtUtil;
import codeholic.service.OpenStackApiService;
import codeholic.service.RedisUtil;
import codeholic.service.TagService;

@RestController
@RequestMapping("/main")
@CrossOrigin(origins = "*")
class MainController {


    @Autowired
    OpenStackApiService openStackApiService;

    @Autowired
    BoardService boardService;

    @Autowired
    TagService tagService;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    RedisUtil redisUtil;
    /*
    @GetMapping
    public String helloworld1(final HttpServletRequest req) throws IOException {
        openStackApiService.signupProcess("test12", "test12");
        String user = openStackApiService.signinProcess("test12", "test12");
        String username = "test11";
        try {
            String authenticationToken = user;
            //openStackApiService.createVm(username, authenticationToken);
            String instanceId = openStackApiService.getUserInstanceId(username, authenticationToken);
            
            VmStatus st = openStackApiService.getInstanceStatus(authenticationToken, instanceId);
            
            String floatingIp = st.getFloatingIp()+"";
            if(st.getStatus().equals("active")&&floatingIp.equals("0")){
                String fixedIpAddress =openStackApiService.getFixedIpAddress(authenticationToken,instanceId);
                String portId = openStackApiService.getPortId(authenticationToken,fixedIpAddress);
                String floatingNetworkId =openStackApiService.getFloatingNetworkId(authenticationToken);
                floatingIp =  openStackApiService.assignFloatingIp(floatingNetworkId,fixedIpAddress, portId, authenticationToken);
                return openStackApiService.getCodeServer(authenticationToken, floatingIp, username);
            }
            
            return "loading";
        } catch (Exception e) {
            return "Nope";
        }       
    }
    */

   @GetMapping("/test")
    public String test1(HttpServletResponse res) throws IOException {
        try{
            Board board = new Board();
            board.setBody("test");
            board.setTitle("test");
    
            String[] tagName = "test1 test2 test3".split("\\s");
            List<Tag> tags = tagService.createTags(tagName);
            board.setTags(tags);
            
            board.setUsername("test");
            board.setMember_name("test");
            
            boardService.createBoard(board);
    
            return "db_connection_success";
        }catch(Exception e){
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return "db_connection_fail";
            
        }

    }
    @GetMapping("/authorized")
    public String helloworld2() {   
        try {
            openStackApiService.signinProcess("testtest", "testtest");
            return "Only user!!!";
        } catch (Exception e) {
            return e.getMessage();
        }
        
    }
}

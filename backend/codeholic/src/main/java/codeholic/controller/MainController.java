package codeholic.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import codeholic.service.OpenStackApiService;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
class MainController {


    @Autowired
    OpenStackApiService openStackApiService;

    @GetMapping("/")
    public String helloworld1(final HttpServletRequest req) {
        return "helloworld";
    }

    @GetMapping("/system")
    public String helloworld2(final HttpServletRequest req) {
        return "helloworld from ";
    }

   @GetMapping("/test1")
    public String test1() throws IOException {
        String url = openStackApiService.signupProcess("test20", "$2a$10$gvIrFTx6d6CnUKWeOF4cb.dRLvBFlGbAbOQPK2FoHCUTr6wC7l7uO");
        //String networkId = openStackApiService.getNetworkId(authenticationToken);
        //String imageId = openStackApiService.getImageId(authenticationToken);
        //String instanceId = openStackApiService.createVm("test10", imageId, networkId, authenticationToken);
        
        //String listInstances = openStackApiService.listInstances(authenticationToken);
        //String fixedIpAddress = openStackApiService.getFixedIpAddress(authenticationToken,"55ae077d-a0d5-45f8-8408-0c1f2abf27fd");
        //String portId = openStackApiService.getPortId(authenticationToken,fixedIpAddress);
        //String floatingNetworkId = openStackApiService.getFloatingNetworkId(authenticationToken);
        //String floatingIp = openStackApiService.assignFloatingIp(floatingNetworkId, fixedIpAddress, portId, authenticationToken);
        //172.24.4.190
        //String url = openStackApiService.getCodeServer(authenticationToken, "172.24.4.190", "test10");
        return url;
        //{ "id": 8, "name": "test10", "addr": "172.24.4.190" }????

        //어떤 인스턴스는 되고 어떤 인스턴스는 안된다....
    }
    @GetMapping("/authorized")
    public String helloworld2() {   
        return "Only user!!!";
    }
}

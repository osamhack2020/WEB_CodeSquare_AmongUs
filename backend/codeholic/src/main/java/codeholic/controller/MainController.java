package codeholic.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping
@CrossOrigin(origins="*")       
class MainController{

    
    @GetMapping("/")
    public String helloworld(final HttpServletRequest req) {   
        return "helloworld";
    }
    @GetMapping("/authorized")
    public String helloworld2() {   
        return "Only user!!!";
    }
}

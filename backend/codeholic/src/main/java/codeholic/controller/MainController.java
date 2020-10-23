package codeholic.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;


@RestController
@RequestMapping
@CrossOrigin(origins="*")       
class MainController{

    @Value("${spring.profiles.active}")
    String str;
    @GetMapping("/")
    public String helloworld1(final HttpServletRequest req) {   
        return "helloworld";
    }
    
    @GetMapping("/prod")
    public String helloworld2(final HttpServletRequest req) {   
        return "helloworld from "+str;
    }

    @GetMapping("/authorized")
    public String helloworld2() {   
        return "Only user!!!";
    }
}

package codeholic.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


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
    @GetMapping("/post")
    public String postTest(){
        try{
            final OkHttpClient client = new OkHttpClient();
            
            final String url = "http://35.216.84.92/identity/v3/auth/tokens";
            final String postBody = "{ \"auth\": {\"identity\": {\"methods\": [\"password\"],\"password\": {\"user\": {\"name\":"+
                    "\"admin\",\"domain\": { \"id\": \"default\" },\"password\": \"cert0188!\"}}},\"scope\": {\"project\": {\"name\": \"admin\",\"domain\": { \"id\": \"default\" }}}}}";
            final Request request = new Request.Builder()
                .url(url)
                .post(RequestBody.create(MediaType.parse("application/json"),postBody))
                .build();
            final Response response = client.newCall(request).execute();
            return response.header("X-Subject-Token").toString();
        }catch(final Exception e){
            return "fail";
        }
    }
}
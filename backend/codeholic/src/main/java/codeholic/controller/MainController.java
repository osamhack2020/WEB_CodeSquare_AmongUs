package codeholic.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import codeholic.domain.Board;
import codeholic.domain.Tag;
import codeholic.service.BoardService;
import codeholic.service.OpenStackApiService;
import codeholic.service.TagService;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
class MainController {


    @Autowired
    OpenStackApiService openStackApiService;

    @Autowired
    BoardService boardService;

    @Autowired
    TagService tagService;

    
    @GetMapping("/")
    public String helloworld1(final HttpServletRequest req) {
        return "helloworld";
    }


   @GetMapping("/test")
    public String test1() throws IOException {
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
            return "db_connection_fail";
        }

    }
    @GetMapping("/authorized")
    public String helloworld2() {   
        return "Only user!!!";
    }
}

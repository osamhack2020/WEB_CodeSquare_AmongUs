package codeholic;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import codeholic.domain.Board;
import codeholic.domain.Reply;
import codeholic.domain.Tag;
import codeholic.service.BoardService;
import codeholic.service.ReplyService;
import codeholic.service.TagService;

@ExtendWith(SpringExtension.class) 
@SpringBootTest
@Commit
class BoardServiceTest {
    
    Logger logger = LoggerFactory.getLogger(BoardServiceTest.class);

    @Autowired
    BoardService boardService;

    @Autowired
    ReplyService replyService;

    @Autowired
    TagService tagService;
    
    @Test
    public void testA(){
        //create tag
    }
    
    @Test
    public void testB(){
        
        //createBoard
        // 총 11개의 보드 생성하기
        IntStream.range(0,11).forEach( i ->{
            final Board board = new Board();
            board.setBody("test body ["+i+"]");
            board.setTitle("title ["+i+"]");
            board.setUser_id("namkyu"+i);
            boardService.createBoard(board);
            Tag tag1 = new Tag("web",board.getId());
            Tag tag2 = new Tag("react",board.getId());
            tagService.createTag(tag1);
            tagService.createTag(tag2);
        });
        logger.info("createBoard test complete");
    }
    /*
    @Test
    public void testC(){
        // getBoardByTitle
        // 페이징 처리
        final String title = "1";
        final List<Board> board = boardService.findByTitle(title, 5, 1);
        board.forEach(i ->{
            logger.info("getBoardByTitle -> "+i.getTitle());
        });
        logger.info("getBoardByTitle test complete");
    }

    @Test
    public void testD(){
        // getBoardByBody
        final String body = "1";
        final List<Board> board = boardService.findByBody(body, 5, 1);
        board.forEach(i ->{
            logger.info("getBoardByBody -> "+i.getBody());
        });
        logger.info("getBoardByBody test complete");
    }
    @Test
    public void testE(){
        // updateBoard
        final Board board = boardService.findById(5);
        board.setBody("changed");
        boardService.updateBoard(board);
        logger.info("origninal to "+boardService.findById(5).getBody());
    }
    @Test
    public void testF(){
        // deleteBoard
        boardService.deleteBoard(8);
        logger.info("Delete finished");
    }
    */
    @Test
    public void testD(){
        //create reply
        for(int k=1;k<12;k++){
            Board board = boardService.findById(k);
            if(board == null) continue;
            IntStream.range(0,11).forEach( i ->{
                Reply reply = new Reply();
                reply.setBody("body ["+i+"]");
                reply.setUser_id("id ["+i+"]");
                replyService.addReply(reply);
            });
            logger.info("createReply test complete");
        }
    }
    /*
    @Test
    public void testH(){
        //getting board Replies
        int id = 2;
        Board board = boardService.findById(id);
        List<Reply> replies = replyService.getBoardReplies(board, 5, 1);
        logger.info("replies num : "+replies.size()+", first command : "+replies.get(0).getBody());
    }
    */
}
package codeholic.controller;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import codeholic.domain.Board;
import codeholic.domain.Reply;
import codeholic.domain.Response;
import codeholic.domain.request.RequestNewBoard;
import codeholic.domain.request.RequestUpdateBoard;
import codeholic.domain.response.BoardResponse;
import codeholic.service.BoardService;
import codeholic.service.ReplyService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("board")
public class BoardController {

    @Value("${countPerPage}")
    int countPerPage;
    
    @Autowired
    BoardService boardService;

    @Autowired
    ReplyService replyService;


    @GetMapping("/{pageNum}")
    public Response boardList(@PathVariable Optional<Integer> pageNum){
        BoardResponse br = boardService.findAll(countPerPage, pageNum.isPresent()?pageNum.get():1);
        Response response = new Response();
        response.setData(br);
        response.setResponse("success");
        response.setMessage("조회성공");
        return response;
    }

    @GetMapping("/title/{title}/{pageNum}")
    public Response searchByTitle(@PathVariable Optional<String> title,
                                    @PathVariable Optional<Integer> pageNum){
        Response response = new Response();
        BoardResponse br = boardService.findByTitle(title.isPresent()?title.get():"", countPerPage, pageNum.isPresent()?pageNum.get():1);
        response.setData(br);
        response.setResponse("success");
        response.setMessage("조회성공");
        return response;
    }

    @GetMapping("/body/{body}/{pageNum}")
    public Response searchByBody(@PathVariable Optional<String> body,
                                    @PathVariable Optional<Integer> pageNum){
        Response response = new Response();
        BoardResponse br = boardService.findByBody(body.isPresent()?body.get():"", countPerPage, pageNum.isPresent()?pageNum.get():1);
        response.setData(br);
        response.setMessage("조회성공");
        response.setResponse("success");
        return response;
    }
    // 새로운 board 등록
    @PostMapping("/")
    public Response newBoard(@RequestBody RequestNewBoard requestNewBoard){
        Response response = new Response();
        Board board = new Board();
        board.setBody(requestNewBoard.getBody());
        //board.setTag(requestNewBoard.getTag());
        board.setTitle(requestNewBoard.getTitle());
        board.setUser_id(requestNewBoard.getUser_id());
        boardService.createBoard(board);
        response.setData(board);
        response.setMessage("게시물 생성 성공");
        response.setResponse("success");
        return response;
    }
    // 게시물 업데이트
    // 없는 번호 예외처리해야함
    @PutMapping
    public Response updateBoard(@RequestBody RequestUpdateBoard requestUpdateBoard){
        
        // 저렇게 json형식으로 받아서
        // 해당 내용이 null 이 아니면
        // board_id로 보드 가져온 후에
        // setter 로 수정
        // 그후 다시 실행하기
        // 고치지 않을 경우는 요청 x
        Response response = new Response();
        try{
            Board board = boardService.findById(requestUpdateBoard.getBoard_id());
            if(requestUpdateBoard.getBody()!=null)
                board.setBody(requestUpdateBoard.getBody());
           //if(requestUpdateBoard.getTag()!=null)
                //board.setTag(requestUpdateBoard.getTag());
            if(requestUpdateBoard.getTitle()!=null)
                board.setTitle(requestUpdateBoard.getTitle());
            board.setUpdated_at(new Date());
            boardService.updateBoard(board);
            response.setData(board);
            response.setMessage("게시글을 수정하였습니다.");
            response.setResponse("success");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("해당 게시물이 없습니다.");
            response.setResponse("fail");
        }
        return response;
    }
    // 게시물 삭제
    // 없는 번호 예외처리
    @DeleteMapping("/{board}")
    public Response deleteBoard(@PathVariable Optional<Integer> board){
        Response response = new Response();
        try{
            Integer id = board.isPresent()? board.get():null;
            List<Reply> reply = replyService.findReplyByBoard_id(id);
            reply.forEach(action->{
                action.setBoard(null);
                replyService.deleteReply(action);
            });
            boardService.deleteBoard(id);
            response.setMessage("게시글을 삭제하였습니다.");
            response.setResponse("success");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("게시글 삭제를 실패하였습니다.");
            response.setResponse("fail");
        }
        return response;
    }
    @PutMapping("/view/{board}")
    public Response updateView(@PathVariable Optional<Integer> board){
        Response response = new Response();
        try{
            Integer id = board.isPresent()? board.get():null;
            Board updatedBoard = boardService.findById(id);
            updatedBoard.addView();
            boardService.updateBoard(updatedBoard);
            response.setMessage("view 1회 증가");
            response.setResponse("success");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("view 1회 증가에 실패하였습니다.");
            response.setResponse("fail");
        }
        return response;
    }
    @PutMapping("/recommend/{board}")
    public Response updateRecommend(@PathVariable Optional<Integer> board){
        Response response = new Response();
        try{
            Integer id = board.isPresent()? board.get():null;
            Board updatedBoard = boardService.findById(id);
            updatedBoard.addRecommend();
            boardService.updateBoard(updatedBoard);
            response.setMessage("recommend 1회 증가");
            response.setResponse("success");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("recommend 1회 증가에 실패하였습니다.");
            response.setResponse("fail");
        }
        return response;
    }
    @GetMapping("/specific/{board}")
    public Response specificBoard(@PathVariable Optional<Integer> board){
        Response response = new Response();
        try{
            Integer id = board.isPresent()? board.get():null;
            Board returnBoard = boardService.findById(id);
            response.setData(returnBoard);
            response.setMessage("반환된 게시물");
            response.setResponse("success");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("게시물 반환에 실패하였습니다.");
            response.setResponse("fail");
        }
        return response;
    }

}
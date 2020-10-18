package codeholic.controller;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import javax.transaction.Transactional;

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
import codeholic.domain.BoardVote;
import codeholic.domain.Response;
import codeholic.domain.Tag;
import codeholic.domain.request.RequestNewBoard;
import codeholic.domain.request.RequestUpdateBoard;
import codeholic.domain.request.RequestVote;
import codeholic.domain.response.BoardResponse;
import codeholic.service.BoardService;
import codeholic.service.BoardVoteService;
import codeholic.service.ReplyService;
import codeholic.service.TagService;

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

    @Autowired
    TagService tagService;

    @Autowired
    BoardVoteService boardVoteService;

    @GetMapping("/{pageNum}")
    public Response boardList(@PathVariable Optional<Integer> pageNum){
        Response response = new Response();
        try{
            BoardResponse br = boardService.findAll(countPerPage, pageNum.isPresent()?pageNum.get():1);
            response.setData(br);
            response.setMessage("조회성공");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("조회 실패");
            response.setResponse("fail");
        }
        return response;
    }

    @GetMapping("/title/{title}/{pageNum}")
    public Response searchByTitle(@PathVariable Optional<String> title,
                                    @PathVariable Optional<Integer> pageNum){
        
        Response response = new Response();
        try{
            BoardResponse br = boardService.findByTitle(title.isPresent()?title.get():"", countPerPage, pageNum.isPresent()?pageNum.get():1);
            response.setData(br);
            response.setMessage("조회성공");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("검색 실패");
            response.setResponse("fail");
        }
        return response;
    }

    @GetMapping("/body/{body}/{pageNum}")
    public Response searchByBody(@PathVariable Optional<String> body,
                                    @PathVariable Optional<Integer> pageNum){
        Response response = new Response();
        try{
            BoardResponse br = boardService.findByBody(body.isPresent()?body.get():"", countPerPage, pageNum.isPresent()?pageNum.get():1);
            response.setData(br);
            response.setMessage("조회성공");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("검색 실패");
            response.setResponse("fail");
        }
        return response;
    }
    // 새로운 board 등록
    @PostMapping("/")
    public Response newBoard(@RequestBody RequestNewBoard requestNewBoard){
        Response response = new Response();
        try{
            Board board = new Board();
            board.setBody(requestNewBoard.getBody());
            board.setTitle(requestNewBoard.getTitle());
            board.setUsername(requestNewBoard.getUsername());
            String[] tagName = requestNewBoard.getTag().split("\\s");
            List<Tag> tags = tagService.createTags(tagName);
            board.setTags(tags);
            boardService.createBoard(board);
            response.setData(board);
            response.setMessage("게시물 생성 성공");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("게시물 생성 실패");
            response.setResponse("fail");
        }
        return response;
    }
    // 게시물 업데이트
    // 없는 번호 예외처리해야함
    @PutMapping
    public Response updateBoard(@RequestBody RequestUpdateBoard requestUpdateBoard){
        
        Response response = new Response();
        try{
            Board board = boardService.findById(requestUpdateBoard.getBoard_id());
            if(requestUpdateBoard.getBody()!=null)
                board.setBody(requestUpdateBoard.getBody());
           if(requestUpdateBoard.getTag()!=null){
               String[] tagName =requestUpdateBoard.getTag().split("\\s");
               tagService.updateTags(tagName, board);
           } 
            if(requestUpdateBoard.getTitle()!=null)
                board.setTitle(requestUpdateBoard.getTitle());
            board.setUpdated_at(new Date());
            boardService.updateBoard(board);
            response.setData(board);
            response.setMessage("게시글을 수정하였습니다.");
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
            boardService.deleteBoard(id);
            response.setMessage("게시글을 삭제하였습니다.");
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
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("view 1회 증가에 실패하였습니다.");
            response.setResponse("fail");
        }
        return response;
    }
    
    @Transactional
    @PutMapping("/recommend")
    public Response updateRecommend(@RequestBody RequestVote requestBoardVote){
        Response response = new Response();
        try{
            Board updatedBoard = boardService.findById(requestBoardVote.getId());
            //username이 이미 존재한다면 역으로 값 수정해주기
            BoardVote tmpVote = boardVoteService.findByUsername(requestBoardVote.getUsername());
            if(tmpVote!=null){
                updatedBoard.fixRecommend(-tmpVote.getValue());
                boardVoteService.deleteBoardVote(tmpVote);
            }
            BoardVote newVote = new BoardVote();
            newVote.setBoard(requestBoardVote.getId());
            newVote.setUsername(requestBoardVote.getUsername());
            newVote.setValue(requestBoardVote.getValue());
            updatedBoard.fixRecommend(requestBoardVote.getValue());
            boardVoteService.createBoardVote(newVote);
            boardService.updateBoard(updatedBoard);
            response.setMessage("recommend 수정");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("recommend 수정 실패하였습니다.");
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
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("게시물 반환에 실패하였습니다.");
            response.setResponse("fail");
        }
        return response;
    }

}
package codeholic.controller;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
import codeholic.domain.BoardComment;
import codeholic.domain.Response;
import codeholic.domain.request.RequestNewComment;
import codeholic.domain.request.RequestUpdateBody;
import codeholic.service.BoardCommentService;
import codeholic.service.BoardService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("boardcomment")
public class BoardCommentController {

    
    @Autowired
    BoardCommentService boardCommentService;

    @Autowired
    BoardService boardService;

    @GetMapping("/{board}")
    public Response returnAllBoardComments(@PathVariable Optional<Integer> board){
        Response response = new Response();
        try{
            List<BoardComment> comments = boardCommentService.getBoardComments(board.isPresent()?board.get():null);
            response.setData(comments);
            response.setMessage("게시물 댓글 조회 성공");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("게시물 댓글 조회 실패");
            response.setResponse("fail");
        }
        return response;
    }

    @PostMapping("/{board}")
    public Response addBoardComment(@PathVariable Optional<Integer> board, @RequestBody RequestNewComment newBoardComment){
        Response response = new Response();
        try{
            Board gBoard = boardService.findById(board.isPresent()?board.get():null);
            BoardComment boardComment = new BoardComment();
            boardComment.setBoard(gBoard);
            boardComment.setBody(newBoardComment.getBody());
            boardComment.setUsername(newBoardComment.getUsername());
            boardCommentService.addBoardComment(boardComment);
    
            response.setMessage("게시물 댓글 생성 성공");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("게시물 댓글 생성 실패");
            response.setResponse("fail");
        }
        return response;
    }

    @PutMapping("/{comment}")
    public Response updateBoardComment(@PathVariable Optional<Integer> comment, @RequestBody RequestUpdateBody newBody){
        Response response = new Response();
        try{
            BoardComment updateComment = boardCommentService.findById(comment.isPresent()?comment.get():null);
            updateComment.setBody(newBody.getBody());
            updateComment.setUpdated_at(new Date());
            boardCommentService.updateBoardComment(updateComment);
            response.setMessage("게시물 댓글 수정 성공");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("게시물 댓글 수정 실패");
            response.setResponse("fail");
        }
        return response;
    }
    @DeleteMapping("/{comment}")
    public Response deleteBoardComment(@PathVariable Optional<Integer> comment){
        Response response = new Response();
        try{
            BoardComment deleteComment = boardCommentService.findById(comment.isPresent()?comment.get():null);
            boardCommentService.deleteBoardComment(deleteComment);
            response.setMessage("게시물 댓글 삭제 성공");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("게시물 댓글 삭제 실패");
            response.setResponse("fail");
        }
        return response;
    }
}

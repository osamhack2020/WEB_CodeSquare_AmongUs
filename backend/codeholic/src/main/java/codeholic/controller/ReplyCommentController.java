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

import codeholic.domain.Reply;
import codeholic.domain.ReplyComment;
import codeholic.domain.Response;
import codeholic.domain.request.RequestNewComment;
import codeholic.domain.request.RequestUpdateBody;
import codeholic.service.ReplyCommentService;
import codeholic.service.ReplyService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("replycomment")
public class ReplyCommentController {

    
    @Autowired
    ReplyCommentService replyCommentService;

    @Autowired
    ReplyService replyService;

    @GetMapping("/{reply}")
    public Response returnAllReplyComments(@PathVariable Optional<Integer> reply){
        Response response = new Response();
        try{
            List<ReplyComment> comments = replyCommentService.getReplyComments(reply.isPresent()?reply.get():null);
            response.setData(comments);
            response.setMessage("답글 댓글 조회 성공");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("답글 댓글 조회 실패");
            response.setResponse("fail");
        }
        return response;
    }

    @PostMapping("/{reply}")
    public Response addReplyComment(@PathVariable Optional<Integer> reply, @RequestBody RequestNewComment newComment){
        Response response = new Response();
        try{
            Reply gReply = replyService.findById(reply.isPresent()?reply.get():null);
            ReplyComment replyComment = new ReplyComment();
            replyComment.setReply(gReply);
            replyComment.setBody(newComment.getBody());
            replyComment.setUsername(newComment.getUsername());
            replyComment.setMember_name(newComment.getMember_name());
            replyCommentService.addReplyComment(replyComment);
    
            response.setMessage("답글 댓글 생성 성공");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("답글 댓글 생성 실패");
            response.setResponse("fail");
        }
        return response;
    }

    @PutMapping("/{comment}")
    public Response updateReplyComment(@PathVariable Optional<Integer> comment, @RequestBody RequestUpdateBody newBody){
        Response response = new Response();
        try{
            ReplyComment updateComment = replyCommentService.findById(comment.isPresent()?comment.get():null);
            updateComment.setBody(newBody.getBody());
            updateComment.setUpdated_at(new Date());
            replyCommentService.updateReplyComment(updateComment);
            response.setMessage("게시물 댓글 수정 성공");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("게시물 댓글 수정 실패");
            response.setResponse("fail");
        }
        return response;
    }
    @DeleteMapping("/{comment}")
    public Response deleteReplyComment(@PathVariable Optional<Integer> comment){
        Response response = new Response();
        try{
            ReplyComment deleteComment = replyCommentService.findById(comment.isPresent()?comment.get():null);
            replyCommentService.deleteReplyComment(deleteComment);
            response.setMessage("게시물 댓글 삭제 성공");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            response.setMessage("게시물 댓글 삭제 실패");
            response.setResponse("fail");
        }
        return response;
    }
}

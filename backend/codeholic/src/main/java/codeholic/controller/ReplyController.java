package codeholic.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
import codeholic.domain.Reply;
import codeholic.domain.ReplyVote;
import codeholic.domain.ReplyWithVote;
import codeholic.domain.Response;
import codeholic.domain.User;
import codeholic.domain.request.RequestNewReply;
import codeholic.domain.request.RequestUpdateBody;
import codeholic.domain.request.RequestVote;
import codeholic.service.AuthService;
import codeholic.service.BoardService;
import codeholic.service.ReplyService;
import codeholic.service.ReplyVoteService;
import javassist.NotFoundException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("replies")
public class ReplyController {

    @Value("${countPerPage}")
    int countPerPage;

    @Autowired
    BoardService boardService;

    @Autowired
    ReplyService replyService;

    @Autowired
    AuthService authService;

    @Autowired
    ReplyVoteService replyVoteService;

    @GetMapping("/{board}")
    public Response returnAllReplies(@PathVariable Optional<Integer> board,HttpServletResponse res) {
        Response response = new Response();
        try {
            List<Reply> replies = replyService.getBoardReplies(board.isPresent() ? board.get() : null);
            List<ReplyWithVote> result = new ArrayList<>();
            replies.forEach(reply -> {
                ReplyWithVote tmp = new ReplyWithVote();
                tmp.setReply(reply);
                ReplyVote replyVote = replyVoteService.findByUsername(reply.getUsername());
                int value = replyVote!=null?replyVote.getValue():0;
                tmp.setValue(value);
                result.add(tmp);
            });
            response.setData(replies);
            response.setMessage("답글 조회 성공");
        } catch (EmptyResultDataAccessException | NoSuchElementException e) {
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setMessage("답글 조회 실패");
            response.setResponse("fail");
        }
        return response;
    }

    @PostMapping("/{board}")
    public Response addReply(@PathVariable Optional<Integer> board, @RequestBody RequestNewReply requestNewReply,
            HttpServletRequest req,HttpServletResponse res) throws NotFoundException {
        Response response = new Response();
        try{
            Board getBoard = boardService.findById(board.isPresent()?board.get():null);
            Reply reply = new Reply();
            reply.setBody(requestNewReply.getBody());

            final String accessJwtHeader = req.getHeader("Authorization"); 
            User user = authService.findByToken(accessJwtHeader);

            reply.setUsername(user.getUsername());
            reply.setMember_name(user.getName());
            reply.setBoard(getBoard);
            replyService.addReply(reply);
            response.setData(reply);
            response.setMessage("답글 생성 성공");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setMessage("답글 생성 실패");
            response.setResponse("fail");
        }
        return response;
    }
    @PutMapping("/{reply}")
    public Response updateReply(@PathVariable Optional<Integer> reply, @RequestBody RequestUpdateBody requestupDateReply,HttpServletResponse res){
        Response response = new Response();
        try{
            Reply updatedReply = replyService.findById(reply.isPresent()?reply.get():null);
            updatedReply.setBody(requestupDateReply.getBody());
            updatedReply.setUpdated_at(new Date());
            replyService.updateReply(updatedReply);
            response.setMessage("답글 수정 성공");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setMessage("답글 수정 실패");
            response.setResponse("fail");
        }
        return response;
    }
    @DeleteMapping("/{reply}")
    public Response deleteReply(@PathVariable Optional<Integer> reply,HttpServletResponse res){
        Response response = new Response();
        try{
            Reply deletedReply = replyService.findById(reply.isPresent()?reply.get():null);
            replyService.deleteReply(deletedReply);
            response.setMessage("답글 삭제 성공");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setMessage("답글 삭제 실패");
            response.setResponse("fail");
        }
        return response;
    }
    @Transactional
    @PutMapping("/recommend")
    public Response addRecommend(@RequestBody RequestVote requestVote,HttpServletResponse res){
        Response response = new Response();
        try{
            Reply updatedReply = replyService.findById(requestVote.getId());
            ReplyVote tmpVote = replyVoteService.findByUsername(requestVote.getUsername());
            if(tmpVote != null){
                updatedReply.fixRecommend(-tmpVote.getValue());
                replyVoteService.deleteReplyVote(tmpVote);
            }
            ReplyVote newVote = new ReplyVote();
            newVote.setReply(requestVote.getId());
            newVote.setUsername(requestVote.getUsername());
            newVote.setValue(requestVote.getValue());
            updatedReply.fixRecommend(requestVote.getValue());
            replyVoteService.createReplyVote(newVote);
            
            replyService.updateReply(updatedReply);
            response.setMessage("답글 추천수 수정 성공");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setMessage("답글 추천수 수정 실패");
            response.setResponse("fail");
        }
        return response;
    }
    @PutMapping("/adopted/{reply}")
    public Response adoptedReply(@PathVariable Optional<Integer> reply,HttpServletResponse res){
        Response response = new Response();
        try{
            Reply updatedReply = replyService.findById(reply.isPresent()?reply.get():null);
            updatedReply.adopted();
            replyService.updateReply(updatedReply);
            response.setMessage("답글 채택 성공");
        }catch(EmptyResultDataAccessException | NoSuchElementException e){
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setMessage("답글 채택 실패");
            response.setResponse("fail");
        }
        return response;
    }
    
}
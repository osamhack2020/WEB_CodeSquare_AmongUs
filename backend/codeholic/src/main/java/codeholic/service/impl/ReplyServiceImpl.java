package codeholic.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import codeholic.domain.Reply;
import codeholic.domain.ReplyComment;
import codeholic.domain.ReplyVote;
import codeholic.repository.ReplyRepository;
import codeholic.service.BoardService;
import codeholic.service.ReplyCommentService;
import codeholic.service.ReplyService;
import codeholic.service.ReplyVoteService;

@Service
public class ReplyServiceImpl implements ReplyService {

    @Autowired
    BoardService boardService;

    @Autowired
    ReplyRepository replyRepository;
    
    @Autowired
    ReplyCommentService replyCommentService;

    @Autowired
    ReplyVoteService replyVoteService;

    @Override
    public Reply findById(int id) {
       return replyRepository.findById(id).get();
    }

    @Override
    public List<Reply> getBoardReplies(int board,int countPerPage,int currentPage) {
        Pageable pageable = PageRequest.of(currentPage-1,countPerPage);
        Page<Reply> page = replyRepository.findReplyByBoard_idOrderByIdAsc(board, pageable);
        return page.getContent();
    }
    

    @Override
    public void addReply(Reply reply) {
        replyRepository.save(reply);
    }

    @Override
    public void updateReply(Reply reply) {
        replyRepository.save(reply);
    }

    @Override
    public void deleteReply(Reply reply) {
        int id = reply.getId();
        //  답글의 모든 댓글 삭제
        List<ReplyComment> comments = replyCommentService.getReplyComments(id);
        comments.forEach(action->replyCommentService.deleteReplyComment(action));
        // 답글의 모든 vote 삭제
        List<ReplyVote> votes = replyVoteService.findByReplyId(id);
        votes.forEach(action->replyVoteService.deleteReplyVote(action));
        reply.setBoard(null);
        replyRepository.delete(reply);
    }

    @Override
    public List<Reply> findReplyByBoard_id(int id) {
        return replyRepository.findReplyByBoard_id(id);
    }

    
}
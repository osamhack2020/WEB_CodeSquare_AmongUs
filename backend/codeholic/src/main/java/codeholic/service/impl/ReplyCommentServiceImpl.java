package codeholic.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import codeholic.domain.ReplyComment;
import codeholic.repository.ReplyCommentRepository;
import codeholic.service.ReplyCommentService;

@Service
public class ReplyCommentServiceImpl implements ReplyCommentService {


    @Autowired
    ReplyCommentRepository replyCommentRepository;

    @Override
    public List<ReplyComment> getReplyComments(int reply) {
        return replyCommentRepository.findReplyCommentByReply_idOrderByIdAsc(reply);
    }

    @Override
    public void addReplyComment(ReplyComment replyComment) {
        replyCommentRepository.save(replyComment);
    }

    @Override
    public void updateReplyComment(ReplyComment replyComment) {
        replyCommentRepository.save(replyComment);
    }

    @Override
    public void deleteReplyComment(ReplyComment replyComment) {
        replyComment.setReply(null);
        replyCommentRepository.delete(replyComment);
    }

    @Override
    public ReplyComment findById(int id) {
        return replyCommentRepository.findById(id).get();
    }
    
}

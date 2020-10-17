package codeholic.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import codeholic.domain.ReplyVote;
import codeholic.repository.ReplyVoteRepository;
import codeholic.service.ReplyVoteService;

@Service
public class ReplyVoteServiceImpl implements ReplyVoteService {

    @Autowired
    ReplyVoteRepository replyVoteRepository;
    
    @Override
    public void createReplyVote(ReplyVote replyVote) {
        replyVoteRepository.save(replyVote);
    }

    @Override
    public ReplyVote findByUsername(String username) {
        return replyVoteRepository.findByUsername(username);
    }

    @Override
    public ReplyVote findById(int id) {
        return replyVoteRepository.findById(id).get();
    }

    @Override
    public List<ReplyVote> findByReplyId(int id) {
        return replyVoteRepository.findByReply(id);
    }
    
    @Override
    public void deleteReplyVote(ReplyVote vote) {
        replyVoteRepository.delete(vote);
    }
    
}

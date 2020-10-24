package codeholic.service;

import java.util.List;

import codeholic.domain.ReplyVote;

public interface ReplyVoteService {
    public void createReplyVote(ReplyVote replyVote);
    public ReplyVote findByUsername(String username);
    public ReplyVote findById(int id);
    public void deleteReplyVote(ReplyVote vote);
    public List<ReplyVote> findByReplyId(int id);
}
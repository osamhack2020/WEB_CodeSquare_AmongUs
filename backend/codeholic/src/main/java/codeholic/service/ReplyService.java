package codeholic.service;

import java.util.List;

import codeholic.domain.Reply;

public interface ReplyService {
    List<Reply> getBoardReplies(int board,int countPerPage,int currentPage);
    List<Reply> findReplyByBoard_id(int id);
    void addReply(Reply reply);
    void updateReply(Reply reply);
    void deleteReply(Reply reply);
    Reply findById(int id);
}
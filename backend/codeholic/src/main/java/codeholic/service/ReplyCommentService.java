package codeholic.service;

import java.util.List;

import codeholic.domain.ReplyComment;

public interface ReplyCommentService {
    List<ReplyComment> getReplyComments(int reply);
    void addReplyComment(ReplyComment replyComment);
    void updateReplyComment(ReplyComment replyComment);
    void deleteReplyComment(ReplyComment replyComment);
    ReplyComment findById(int id);
}

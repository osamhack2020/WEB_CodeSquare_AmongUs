package codeholic.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import codeholic.domain.ReplyComment;

public interface ReplyCommentRepository extends CrudRepository<ReplyComment, Integer> {
    List<ReplyComment> findReplyCommentByReply_idOrderByIdAsc(int id);
}

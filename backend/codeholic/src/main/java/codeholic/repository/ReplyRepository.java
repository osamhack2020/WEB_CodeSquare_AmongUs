package codeholic.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import codeholic.domain.Reply;

public interface ReplyRepository extends CrudRepository<Reply, Integer> {
    List<Reply> findReplyByBoard_idOrderByIdAsc(int id);
    List<Reply> findReplyByBoard_id(int id);
}
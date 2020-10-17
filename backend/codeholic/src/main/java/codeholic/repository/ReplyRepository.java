package codeholic.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import codeholic.domain.Reply;

public interface ReplyRepository extends CrudRepository<Reply, Integer> {
    Page<Reply> findReplyByBoard_idOrderByIdAsc(int id, Pageable pageable);
    List<Reply> findReplyByBoard_id(int id);
}
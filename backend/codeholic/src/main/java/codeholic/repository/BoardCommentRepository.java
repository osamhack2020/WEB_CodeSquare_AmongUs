package codeholic.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import codeholic.domain.BoardComment;

public interface BoardCommentRepository extends CrudRepository<BoardComment, Integer> {
    List<BoardComment> findBoardCommentByBoard_idOrderByIdAsc(int id);
}

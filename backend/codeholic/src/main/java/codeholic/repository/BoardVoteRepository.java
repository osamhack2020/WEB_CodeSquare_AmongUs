package codeholic.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import codeholic.domain.BoardVote;

public interface BoardVoteRepository extends CrudRepository<BoardVote, Integer> {
    BoardVote findByUsername(String username);
    List<BoardVote> findByBoard(int board);
}
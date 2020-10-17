package codeholic.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import codeholic.domain.ReplyVote;

public interface ReplyVoteRepository extends CrudRepository<ReplyVote, Integer> {
    ReplyVote findByUsername(String username);
    List<ReplyVote> findByReply(int board);
}
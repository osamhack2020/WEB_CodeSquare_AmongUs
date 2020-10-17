package codeholic.service;

import java.util.List;

import codeholic.domain.BoardVote;

public interface BoardVoteService {
    public void createBoardVote(BoardVote boardVote);
    public BoardVote findByUsername(String username);
    public BoardVote findById(int id);
    public void deleteBoardVote(BoardVote vote);
    public List<BoardVote> findByBoardId(int id);
}
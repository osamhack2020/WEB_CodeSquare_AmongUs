package codeholic.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import codeholic.domain.BoardVote;
import codeholic.repository.BoardVoteRepository;
import codeholic.service.BoardVoteService;

@Service
public class BoardVoteServiceImpl implements BoardVoteService {

    @Autowired
    BoardVoteRepository boardVoteRepository;
    
    @Override
    public void createBoardVote(BoardVote boardVote) {
        boardVoteRepository.save(boardVote);
    }

    @Override
    public BoardVote findByUsername(String username) {
        BoardVote result = null;
        try{
            result = boardVoteRepository.findByUsername(username);
        }catch(Exception e){

        }
        return result;
    }

    @Override
    public BoardVote findById(int id) {
        return boardVoteRepository.findById(id).get();
    }

    @Override
    public List<BoardVote> findByBoardId(int id) {
        return boardVoteRepository.findByBoard(id);
    }
    
    @Override
    public void deleteBoardVote(BoardVote vote) {
        boardVoteRepository.delete(vote);
    }
    
    
}

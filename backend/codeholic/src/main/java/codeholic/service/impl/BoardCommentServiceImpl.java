package codeholic.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import codeholic.domain.BoardComment;
import codeholic.repository.BoardCommentRepository;
import codeholic.service.BoardCommentService;

@Service
public class BoardCommentServiceImpl implements BoardCommentService {


    @Autowired
    BoardCommentRepository boardCommentRepository;

    @Override
    public List<BoardComment> getBoardComments(int board) {
        return boardCommentRepository.findBoardCommentByBoard_idOrderByIdAsc(board);
    }

    @Override
    public void addBoardComment(BoardComment boardComment) {
        boardCommentRepository.save(boardComment);
    }

    @Override
    public void updateBoardComment(BoardComment boardComment) {
        boardCommentRepository.save(boardComment);
    }

    @Override
    public void deleteBoardComment(BoardComment boardComment) {
        boardComment.setBoard(null);
        boardCommentRepository.delete(boardComment);
    }

    @Override
    public BoardComment findById(int id) {
        return boardCommentRepository.findById(id).get();
    }
    
}

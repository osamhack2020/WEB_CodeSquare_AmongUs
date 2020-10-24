package codeholic.service;

import java.util.List;

import codeholic.domain.BoardComment;

public interface BoardCommentService {
    List<BoardComment> getBoardComments(int board);
    void addBoardComment(BoardComment boardComment);
    void updateBoardComment(BoardComment boardComment);
    void deleteBoardComment(BoardComment boardComment);
    BoardComment findById(int id);
}

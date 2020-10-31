package codeholic.service;


import codeholic.domain.Board;
import codeholic.domain.response.BoardResponse;

public interface BoardService {
    BoardResponse findAll(int countPerPage,int currentPage);
    BoardResponse findByTitle(String title,int countPerPage,int currentPage);
    BoardResponse findByBody(String body,int countPerPage,int currentPage);
    void createBoard(Board board);
    void updateBoard(Board board);
    void deleteBoard(int id);
    Board findById(int id);
}
package codeholic.service.impl;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import codeholic.domain.Board;
import codeholic.domain.response.BoardResponse;
import codeholic.repository.BoardRepository;
import codeholic.service.BoardService;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    BoardRepository boardRepository;

    @Override
    public BoardResponse findAll(int countPerPage, int currentPage) {
        try{
            BoardResponse br = new BoardResponse();
            Pageable pageable = PageRequest.of(currentPage-1,countPerPage);
            Page<Board> page = boardRepository.findAllByOrderByIdDesc(pageable); 
            br.setTotalPage(page.getTotalPages());
            br.setBoards(page.getContent());
            return br;
        }catch(NoSuchElementException e){
            return null;
        }
    }

    @Override
    public BoardResponse findByTitle(String title,int countPerPage,int currentPage) {
        //sort 필요하면 하기
        try{
            BoardResponse br = new BoardResponse();
            Pageable pageable = PageRequest.of(currentPage-1,countPerPage);
            Page<Board> page = boardRepository.findBoardByTitleContainingOrderByIdDesc(title, pageable);
            br.setTotalPage(page.getTotalPages());
            br.setBoards(page.getContent());
            return  br;
        }catch(NoSuchElementException e){
            return null;
        }
    }

    @Override
    public BoardResponse findByBody(String body,int countPerPage, int currentPage) {

        try{
            BoardResponse br = new BoardResponse();
            Pageable pageable = PageRequest.of(currentPage-1, countPerPage);
            Page<Board> page = boardRepository.findBoardByBodyContainingOrderByIdDesc(body, pageable);
            br.setTotalPage(page.getTotalPages());
            br.setBoards(page.getContent());
            return br;
        }catch(NoSuchElementException e){
            return null;
        }
    }

    @Override
    public void createBoard(Board board) {
        boardRepository.save(board);
    }

    @Override
    public void updateBoard(Board board) {
        
        boardRepository.save(board);
    }

    @Override
    public void deleteBoard(int id) {
        boardRepository.deleteById(id);
    }

    @Override
    public Board findById(int id) {
        return boardRepository.findById(id).get();
    }
}
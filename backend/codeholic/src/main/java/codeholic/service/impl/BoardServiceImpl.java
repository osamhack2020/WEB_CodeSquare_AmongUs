package codeholic.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import codeholic.domain.Board;
import codeholic.domain.BoardComment;
import codeholic.domain.BoardVote;
import codeholic.domain.Reply;
import codeholic.domain.response.BoardResponse;
import codeholic.repository.BoardRepository;
import codeholic.service.BoardCommentService;
import codeholic.service.BoardService;
import codeholic.service.BoardVoteService;
import codeholic.service.ReplyService;
import codeholic.service.TagService;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    ReplyService replyService;

    @Autowired
    TagService tagService;

    @Autowired
    BoardCommentService boardCommentService;

    @Autowired
    BoardVoteService boardVoteService;

    @Override
    public BoardResponse findAll(int countPerPage, int currentPage) {
        BoardResponse br = new BoardResponse();
        Pageable pageable = PageRequest.of(currentPage-1,countPerPage);
        Page<Board> page = boardRepository.findAllByOrderByIdDesc(pageable); 
        br.setTotalPage(page.getTotalPages());
        br.setBoards(page.getContent());
        return br;
    }

    @Override
    public BoardResponse findByTitle(String title,int countPerPage,int currentPage) {
        BoardResponse br = new BoardResponse();
        Pageable pageable = PageRequest.of(currentPage-1,countPerPage);
        Page<Board> page = boardRepository.findBoardByTitleContainingOrderByIdDesc(title, pageable);
        br.setTotalPage(page.getTotalPages());
        br.setBoards(page.getContent());
        return  br;
    }

    @Override
    public BoardResponse findByBody(String body,int countPerPage, int currentPage) {

        BoardResponse br = new BoardResponse();
        Pageable pageable = PageRequest.of(currentPage-1, countPerPage);
        Page<Board> page = boardRepository.findBoardByBodyContainingOrderByIdDesc(body, pageable);
        br.setTotalPage(page.getTotalPages());
        br.setBoards(page.getContent());
        return br;
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
        //게시물의 모든 답글 삭제
        List<Reply> reply = replyService.findReplyByBoard_id(id);
        reply.forEach(action->replyService.deleteReply(action));
        //게시물의 모든 댓글 삭제
        List<BoardComment> comments = boardCommentService.getBoardComments(id);
        comments.forEach(action->boardCommentService.deleteBoardComment(action));
        // 게시물의 모든 vote 삭제
        List<BoardVote> votes = boardVoteService.findByBoardId(id);
        votes.forEach(action->boardVoteService.deleteBoardVote(action));
        boardRepository.deleteById(id);
    }

    @Override
    public Board findById(int id) {
        return boardRepository.findById(id).get();
    }
}
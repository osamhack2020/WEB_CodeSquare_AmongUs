package codeholic.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import codeholic.domain.Board;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    Page<Board> findAllByOrderByIdDesc(Pageable pageable);
    Page<Board> findBoardByTitleContainingOrderByIdDesc(String keyword, Pageable pageable);
    Page<Board> findBoardByBodyContainingOrderByIdDesc(String keyword, Pageable pageable);
    
}
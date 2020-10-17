package codeholic.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import codeholic.domain.Tag;

public interface TagRepository extends CrudRepository<Tag, Integer> {
    Tag findByBody(String body);
    List<Tag> findByBoard(int board);
}
package codeholic.repository;

import org.springframework.data.repository.CrudRepository;

import codeholic.domain.Tag;

public interface TagRepository extends CrudRepository<Tag, Integer> {
    Tag findByBody(String body);
}
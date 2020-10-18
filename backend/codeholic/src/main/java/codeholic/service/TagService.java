package codeholic.service;

import java.util.List;

import codeholic.domain.Board;
import codeholic.domain.Tag;

public interface TagService {
    public List<Tag> createTags(String[] tags);
    public void updateTags(String[] tags, Board board);
    public Tag findByTagName(String name);
    public Tag findById(int id);
}
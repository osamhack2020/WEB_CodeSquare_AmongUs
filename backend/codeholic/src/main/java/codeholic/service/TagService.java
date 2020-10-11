package codeholic.service;

import java.util.List;

import codeholic.domain.Tag;

public interface TagService {
    public Tag createTag(Tag tag);
    public List<Tag> createTags(String[] tags, int boardId);
    public List<Tag> updateTags(String[] tags, int boardId);
    public void deleteTags(int boardId);
    public Tag findByTagName(String name);
    public Tag findById(int id);
    public List<Tag> findByBoard_id(int id);
}
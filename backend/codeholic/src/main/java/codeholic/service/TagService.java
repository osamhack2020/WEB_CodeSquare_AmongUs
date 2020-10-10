package codeholic.service;

import codeholic.domain.Tag;

public interface TagService {
    public Tag createTag(Tag tag);
    public Tag findByTagName(String name);
    public Tag findById(int id);
}
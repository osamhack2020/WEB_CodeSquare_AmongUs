package codeholic.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import codeholic.domain.Tag;
import codeholic.repository.TagRepository;
import codeholic.service.TagService;

@Service
public class TagServiceImpl implements TagService {

    @Autowired
    TagRepository tagRepository;

    @Override
    public Tag createTag(Tag tag) {
        tagRepository.save(tag);
        return tag;
    }

    @Override
    public Tag findByTagName(String name) {
        return tagRepository.findByBody(name);

    }

    @Override
    public Tag findById(int id) {
        return tagRepository.findById(id).get();
    }
    
}
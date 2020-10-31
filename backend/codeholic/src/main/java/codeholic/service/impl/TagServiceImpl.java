package codeholic.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import codeholic.domain.Board;
import codeholic.domain.Tag;
import codeholic.repository.TagRepository;
import codeholic.service.TagService;

@Service
public class TagServiceImpl implements TagService {

    @Autowired
    TagRepository tagRepository;

    @Override
    public List<Tag> createTags(String[] tags) {
        List<Tag> tagList = new ArrayList<>();
        for(String tag:tags){
            Tag newTag = new Tag();
            newTag.setBody(tag);
            tagList.add(newTag);
        }
        return tagList;
    }
    
    @Override
    public Tag findByTagName(String name) {
        return tagRepository.findByBody(name);
    }

    @Override
    public Tag findById(int id) {
        return tagRepository.findById(id).get();
    }
    @Override
    public void updateTags(String[] tags, Board board) {
        board.getTags().forEach(action->tagRepository.delete(action));
        board.setTags(this.createTags(tags));
    }
}
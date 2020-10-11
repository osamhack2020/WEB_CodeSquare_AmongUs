package codeholic.service.impl;

import java.util.ArrayList;
import java.util.List;

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
    public List<Tag> createTags(String[] tags, int boardId) {
        List<Tag> tagList = new ArrayList<>();
        for(String tag:tags){
            Tag newTag = new Tag();
            newTag.setBody(tag);
            newTag.setBoard(boardId);
            this.createTag(newTag);
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
    public List<Tag> findByBoard_id(int id) {
        return tagRepository.findByBoard(id);
    }

    @Override
    public List<Tag> updateTags(String[] tags, int boardId) {
        this.deleteTags(boardId);
        return this.createTags(tags, boardId);
    }

    @Override
    public void deleteTags(int boardId) {
        List<Tag> tags = tagRepository.findByBoard(boardId);
        tagRepository.deleteAll(tags);
    }

    
    
}
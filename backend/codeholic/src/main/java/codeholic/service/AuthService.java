package codeholic.service;

import java.io.IOException;

import codeholic.domain.Member;
import codeholic.domain.User;
import javassist.NotFoundException;

public interface AuthService {
    void signUpUser(Member member) throws IOException;
    Member findByUsername(String username) throws NotFoundException;
    Member loginUser(String id, String password) throws Exception;
    public User findByToken(String accessJwtHeader) throws NotFoundException ;
}
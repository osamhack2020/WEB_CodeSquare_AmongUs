package codeholic.service;

import codeholic.domain.Member;
import javassist.NotFoundException;

public interface AuthService {
    void signUpUser(Member member);
    Member findByUsername(String username) throws NotFoundException;
    Member loginUser(String id, String password) throws Exception;
}
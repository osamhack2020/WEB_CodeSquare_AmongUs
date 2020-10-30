package codeholic.repository;

import org.springframework.data.repository.CrudRepository;

import codeholic.domain.Member;

public interface MemberRepository extends CrudRepository<Member, Integer> {

    Member findByUsername(String username);

}
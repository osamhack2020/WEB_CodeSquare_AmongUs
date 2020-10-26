package codeholic.service.impl;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import codeholic.domain.Member;
import codeholic.domain.Salt;
import codeholic.repository.MemberRepository;
import codeholic.service.AuthService;
import codeholic.service.JwtUtil;
import codeholic.service.OpenStackApiService;
import codeholic.service.RedisUtil;
import codeholic.service.SaltUtil;
import javassist.NotFoundException;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private SaltUtil saltUtil;
    
    @Autowired
    private RedisUtil redisUtil;
    @Autowired
    private OpenStackApiService openstackApiService;
    
    @Transactional
    @Override
    public void signUpUser(Member member) {
        validateDuplicateMember(member);
        String password = member.getPassword();
        String salt = saltUtil.genSalt();
        member.setSalt(new Salt(salt));
        member.setPassword(saltUtil.encodePassword(salt,password));
        openstackApiService.signinProcess(member.getUsername(), member.getPassword());
        memberRepository.save(member);
    }
    // 중복 회원 검증
    private void validateDuplicateMember(Member member){
        Member findMember = memberRepository.findByUsername(member.getUsername());
        if(findMember != null){
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

    @Override
    public Member loginUser(String id, String password) throws Exception{
        Member member = memberRepository.findByUsername(id);
        if(member==null) throw new Exception ("멤버가 조회되지 않음");
        String salt = member.getSalt().getSalt();
        String passwd = saltUtil.encodePassword(salt,password);
        if(!member.getPassword().equals(passwd))
            throw new Exception ("비밀번호가 틀립니다.");

        String openstackToken = openstackApiService.signinProcess(id, passwd);
        redisUtil.setDataExpire(id+"Openstack", openstackToken, JwtUtil.REFRESH_TOKEN_VALIDATION_SECOND);   

        return member;
    }
    @Override
    public Member findByUsername(String username) throws NotFoundException {
        Member member = memberRepository.findByUsername(username);
        if(member == null) throw new NotFoundException("멤버가 조회되지 않음");
        return member;
    }


}
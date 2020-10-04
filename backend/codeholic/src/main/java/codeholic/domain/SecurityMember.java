package codeholic.domain;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

public class SecurityMember extends User {
    
    private static final long serialVersionUID = 1L;
    
    public SecurityMember(Member member){
        super(member.getUsername(),"{noop}"+ member.getPassword(), AuthorityUtils.createAuthorityList(member.getRole().toString()));
    }

}
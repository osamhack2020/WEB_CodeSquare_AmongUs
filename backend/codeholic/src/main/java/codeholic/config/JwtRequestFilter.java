package codeholic.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import codeholic.domain.Member;
import codeholic.exception.AlreadyLogoutException;
import codeholic.service.CookieUtil;
import codeholic.service.JwtUtil;
import codeholic.service.RedisUtil;
import codeholic.service.impl.MyUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;


@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CookieUtil cookieUtil;

    @Autowired
    private RedisUtil redisUtil;

    // UsernamePasswordAuthenticationFilter 앞에 Custom Filter를 두어 세션이 존재하지 않아도 올바른
    // Jwt 값이 존재하면, SecurityContextHolder에 UserDetail 정보를 넣어 로그인 된 사용자로 인식
    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        //access tocken을 쿠키에서 꺼내는 것이 아니라, acthorization 헤더에 이걸 넣음.
        //final Cookie jwtToken = cookieUtil.getCookie(httpServletRequest,JwtUtil.ACCESS_TOKEN_NAME);
        final String accessJwtHeader = httpServletRequest.getHeader("Authorization"); 
        String accessJwt = null;
        String username = null;
        String refreshJwt = null;
        String refreshUname = null;
        try{
            if(accessJwtHeader != null && accessJwtHeader.startsWith("Bearer ")){
                accessJwt = accessJwtHeader.substring(7);
                if(redisUtil.getData(accessJwt) == accessJwt)
                    throw new AlreadyLogoutException();
                username = jwtUtil.getUsername(accessJwt);
            }
            if(username!=null){
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                if(jwtUtil.validateToken(accessJwt,userDetails)){
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }
        }catch (ExpiredJwtException e) { // 에러처리
            Cookie refreshToken = cookieUtil.getCookie(httpServletRequest,JwtUtil.REFRESH_TOKEN_NAME);
            if(refreshToken!=null){
                refreshJwt = refreshToken.getValue();
            }

            if(refreshJwt != null){
                refreshUname = redisUtil.getData(refreshJwt);
                if(refreshUname.equals(jwtUtil.getUsername(refreshJwt))){
                    UserDetails userDetails = userDetailsService.loadUserByUsername(refreshUname);
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

                    Member member = new Member();
                    member.setUsername(refreshUname);
                    String newToken =jwtUtil.generateToken(member);

                    Cookie newAccessToken = cookieUtil.createCookie(JwtUtil.ACCESS_TOKEN_NAME,newToken);
                    httpServletResponse.addCookie(newAccessToken);
                }
            }

        }catch(AlreadyLogoutException e){
            
        }
        filterChain.doFilter(httpServletRequest,httpServletResponse);
        
    }
}
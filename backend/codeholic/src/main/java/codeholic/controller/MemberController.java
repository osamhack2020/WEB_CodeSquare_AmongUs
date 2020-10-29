package codeholic.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import codeholic.domain.Member;
import codeholic.domain.Response;
import codeholic.domain.request.RequestLoginUser;
import codeholic.exception.AlreadyLogoutException;
import codeholic.service.AuthService;
import codeholic.service.CookieUtil;
import codeholic.service.JwtUtil;
import codeholic.service.RedisUtil;
import io.jsonwebtoken.ExpiredJwtException;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("user")
public class MemberController {
    
   
    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CookieUtil cookieUtil;

    @Autowired
    private RedisUtil redisUtil;

    @PostMapping("/signup")
    public Response signUpUser(@RequestBody Member member,HttpServletResponse res){
        Response response = new Response();

        //실행
        try{
            authService.signUpUser(member);
            final String token = jwtUtil.generateToken(member);
            final String refreshJwt = jwtUtil.generateRefreshToken(member);
            Cookie refreshToken = cookieUtil.createCookie(JwtUtil.REFRESH_TOKEN_NAME, refreshJwt);
            redisUtil.setDataExpire(member.getUsername(), refreshJwt, JwtUtil.REFRESH_TOKEN_VALIDATION_SECOND);
            res.addCookie(refreshToken);
            response.setMessage("회원가입을 성공적으로 완료했습니다.");
            response.setData("Bearer "+token);
        }
        catch(Exception e){
            //아이디 중복시 오류검사....
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setResponse("failed");
            response.setMessage("회원가입을 하는 도중 오류가 발생했습니다.");
            response.setData(e.toString());
        }

        return response;
    }
    
    @PostMapping("/signin")
    public Response login(@Valid @RequestBody RequestLoginUser user,
                          HttpServletRequest req,
                          HttpServletResponse res) {
        try {
            final Member member = authService.loginUser(user.getUsername(), user.getPassword());
            final String token = jwtUtil.generateToken(member);
            final String refreshJwt = jwtUtil.generateRefreshToken(member);
            //Cookie accessToken = cookieUtil.createCookie(JwtUtil.ACCESS_TOKEN_NAME, token);
            Cookie refreshToken = cookieUtil.createCookie(JwtUtil.REFRESH_TOKEN_NAME, refreshJwt);
           // key값이 refreshJwt토큰이고, value값이 유저 이름임.
            redisUtil.setDataExpire(member.getUsername(), refreshJwt, JwtUtil.REFRESH_TOKEN_VALIDATION_SECOND);
            //res.addCookie(accessToken);
            res.addCookie(refreshToken);
            //기본적으로 응답으로 jwt토큰을 주긴 하지만 쿠키에 등록됨.
            return new Response("success", "로그인에 성공했습니다.", "Bearer "+token);
        } catch (Exception e) {
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return new Response("error", "로그인에 실패했습니다.", e.getMessage());
        }
    }
    //로그아웃 처리하기
    //https://velog.io/@tlatldms/%EC%84%9C%EB%B2%84%EA%B0%9C%EB%B0%9C%EC%BA%A0%ED%94%84-Spring-boot-Spring-security-Refresh-JWT-Redis-JPA-4%ED%8E%B8-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%9C%A0%EC%A7%80%EC%99%80-%EB%A1%9C%EA%B7%B8%EC%95%84%EC%9B%83-%EC%B2%98%EB%A6%AC
    //로그아웃시 오픈스텍 토큰도 없애야함
    @PostMapping("/signout")
    public Response logout(
                            HttpServletRequest req,
                            HttpServletResponse res) {
        Response response = new Response();
        String username;
        String accessToken = null;
        try{
            
            accessToken = req.getHeader("Authorization").substring(7);
            username = jwtUtil.getUsername(accessToken);
            //이미 로그아웃한 경우
            if(redisUtil.getData(accessToken) == accessToken){
                throw new AlreadyLogoutException();
            }
            //access token을 블랙리스트로 올리기
            redisUtil.setDataExpire(accessToken, accessToken,  JwtUtil.REFRESH_TOKEN_VALIDATION_SECOND);
            //refresh token을 redis에서 삭제
            redisUtil.deleteData(username);
            //오픈스텍 토큰도 삭제
            redisUtil.deleteData(username+"Openstack");
            response.setResponse("success");
            response.setMessage("로그아웃에 성공했습니다.");
        }catch(ExpiredJwtException ee){
            username = ee.getClaims().getSubject();
            redisUtil.deleteData(username);

            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }catch(AlreadyLogoutException ae){
            response.setResponse("failed");
            response.setMessage("이미 로그아웃하였습니다.");
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }catch(Exception e){
            response.setResponse("failed");
            response.setMessage("로그아웃에 실패하였습니다.");
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }
    @GetMapping("/detail")
    public Response getuserDetail(HttpServletRequest req,HttpServletResponse res){
        Response response = new Response();
        String username;
        String accessToken = null;
        try{
            accessToken = req.getHeader("Authorization").substring(7);
            username = jwtUtil.getUsername(accessToken);
            Member member = authService.findByUsername(username);
            response.setData(member);
            response.setMessage("조회 성공하였습니다");
        }catch(Exception e){
            response.setResponse("failed");
            response.setMessage("조회 실패하였습니다.");
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }
    @GetMapping("/refreshtoken")
    public Response refreshToken(HttpServletRequest req,HttpServletResponse res){
        Response response = new Response();
        Cookie refreshToken = cookieUtil.getCookie(req,JwtUtil.REFRESH_TOKEN_NAME);
        String refreshJwt = null;
        try{
            if(refreshToken == null)
                throw new Exception();
            refreshJwt = refreshToken.getValue();
            if(refreshJwt == null)
                throw new Exception();
            Member member = new Member();
            member.setUsername(jwtUtil.getUsername(refreshJwt));
            String newToken =jwtUtil.generateToken(member);
            response.setMessage("accessToken 생성 성공");
            response.setData("Bearer "+newToken);
        }catch(Exception e){
            response.setMessage("accessToken 생성 실패");
            response.setResponse("fail");
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
        return response;
    }
    // @Valid 에 대한 예외 처리 담당
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Response handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
             errors.put(fieldName, errorMessage);
        });
        Response response = new Response();
        response.setData(errors);
        response.setResponse("fail");
        response.setMessage("오류가 발생했습니다.");
        return response;
    }
}
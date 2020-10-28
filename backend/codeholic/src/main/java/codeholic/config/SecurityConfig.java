package codeholic.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


//SecurityContextPersistenceFilter : SecurityContext 객체를 로딩하여 SecurityContextHolder에 저장하고 요청이 끝나면 삭제
//LogoutFilter : 지정한 경로의 요청이 들어오면 사용자를 로그아웃시킴
//UsernamePasswordAuthennticationFilter : 로그인 요청이 들어오면 아이디/비밀번호 기반의 인증을 수행한다.
//FilterSecurityInterceptor : 인증에 성공한 사용자가 해당 리소스에 접근할 권한이 있는지를 검증
//UsernamePasswordAuthenticationFilter 앞에 Custom Filter를 두어 세션이 존재하지 않아도 올바른 Jwt 값이 존재하면, SecurityContextHolder에 UserDetail 정보를 넣어 로그인 된 사용자로 인식
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true) 
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAccessDeniedHandler JwtAccessDeniedHandler;
    @Autowired
    private JwtRequestFilter JwtRequestFilter;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // rest api이므로 csrf 보안이 필요없으므로 disable처리.
            .cors().and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // jwt token으로 인증할것이므로 세션필요없으므로 생성안함.
            .and()
            //.httpBasic().disable() // rest api 이므로 기본설정 사용안함. 기본설정은 비인증시 로그인폼 화면으로 리다이렉트 된다.
            .httpBasic()
            .authenticationEntryPoint(jwtAuthenticationEntryPoint)
            .and()
            .exceptionHandling().accessDeniedHandler(JwtAccessDeniedHandler)
            .and()
            .authorizeRequests() // 다음 리퀘스트에 대한 사용권한 체크
            .antMatchers("/user/signup").permitAll()
            .antMatchers("/user/signin").permitAll()
            .antMatchers("/user/signout").permitAll()
            .antMatchers("/").permitAll()
            .antMatchers("/test").permitAll()
            .antMatchers("/board").permitAll()
            .antMatchers("/board/").permitAll()
            .antMatchers("/board/{pageNum}").permitAll()
            .antMatchers("user/refreshtoken").permitAll()
            // 나중에 .authenticated()로 바꾸어야 한다.
            .anyRequest().permitAll();
            //.anyRequest().authenticated();

        http.addFilterBefore(JwtRequestFilter, UsernamePasswordAuthenticationFilter.class); // jwt token 필터를 id/password 인증 필터 전에 넣어라.
 
    }

    //cors 관련
    //https://icarus8050.tistory.com/28 참고
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    @Override // ignore check swagger resource
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/v2/api-docs", "/swagger-resources/**",
                "/swagger-ui.html", "/webjars/**", "/swagger/**");
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}

    
    

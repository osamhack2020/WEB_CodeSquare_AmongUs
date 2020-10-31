package codeholic.domain.request;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class RequestLoginUser {
    @NotBlank(message = "아이디를 다시 확인해 보세요")
    private String username;
    @NotBlank(message = "패스워드를 다시 확인해 보세요")
    private String password;

    public RequestLoginUser(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
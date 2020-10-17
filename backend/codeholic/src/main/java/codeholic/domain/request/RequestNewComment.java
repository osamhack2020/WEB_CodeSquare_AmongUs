package codeholic.domain.request;
import lombok.Data;

@Data
public class RequestNewComment {
    private String username;
    private String body;
}

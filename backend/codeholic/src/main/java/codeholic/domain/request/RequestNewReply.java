package codeholic.domain.request;

import lombok.Data;

@Data
public class RequestNewReply {
    private String username;
    private String body;
    private String member_name;
}
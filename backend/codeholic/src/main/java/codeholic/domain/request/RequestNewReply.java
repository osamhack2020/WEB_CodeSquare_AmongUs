package codeholic.domain.request;

import lombok.Data;

@Data
public class RequestNewReply {
    private String user_id;
    private String body;
}
package codeholic.domain.request;

import lombok.Data;

@Data
public class RequestVote {
    String username;
    int id;
    int value;
}

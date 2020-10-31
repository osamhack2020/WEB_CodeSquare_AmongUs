package codeholic.domain;

import lombok.Data;

@Data
public class ReplyWithVote {
    private Reply reply;
    private int value;
}

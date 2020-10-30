package codeholic.domain;

import lombok.Data;

@Data
public class BoardWithVote {
    private Board board;
    private int value;
}

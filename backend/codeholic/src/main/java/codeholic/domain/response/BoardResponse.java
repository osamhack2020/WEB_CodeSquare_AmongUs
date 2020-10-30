package codeholic.domain.response;

import java.util.List;

import codeholic.domain.Board;
import lombok.Data;

@Data
public class BoardResponse {
    int totalPage;
    List<Board> boards;
}
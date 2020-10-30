package codeholic.domain.request;


import lombok.Data;

@Data
public class RequestUpdateBoard {
    String body = null;
    String tag = null;
    String title = null;
    int board_id;
}
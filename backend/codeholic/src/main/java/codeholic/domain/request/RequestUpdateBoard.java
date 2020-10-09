package codeholic.domain.request;

import java.util.Date;

import lombok.Data;

@Data
public class RequestUpdateBoard {
    String body = null;
    String tag = null;
    String title = null;
    
    Date updated_at;

    int board_id;
}
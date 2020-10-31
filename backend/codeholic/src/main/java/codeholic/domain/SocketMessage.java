package codeholic.domain;

import lombok.Data;

@Data
public class SocketMessage {
    private String status="success";
    private SocketData data = new SocketData(); 
}
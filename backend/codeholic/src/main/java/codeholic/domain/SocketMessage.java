package codeholic.domain;

import lombok.Data;

@Data
public class SocketMessage {
    private String status="loading";
    private SocketData data = new SocketData(); 
}
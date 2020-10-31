package codeholic.domain;

import lombok.Data;

@Data
public class SocketMessage {
    private String status=null;
    private SocketData data = new SocketData(); 
}
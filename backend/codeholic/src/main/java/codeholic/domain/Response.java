package codeholic.domain;

import lombok.Data;

@Data
public class Response {
    private String response;
    private String message;
    private Object data;

    public Response(String response, String message, Object data) {
        this.response = response;
        this.message = message;
        this.data = data;
    }

    public Response() {
    }

}
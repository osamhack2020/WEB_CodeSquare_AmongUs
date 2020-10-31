package codeholic.domain;

import lombok.Data;

@Data
public class VmStatus {
    private String status;
    private String launch;
    private String terminate;
    private int floatingIp;
}

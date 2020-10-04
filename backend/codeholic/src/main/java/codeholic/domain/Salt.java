package codeholic.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Salt {

    @Id
    @GeneratedValue
    private int id;

    private String salt;

    public Salt() {
    }

    public Salt(String salt) {
        this.salt = salt;
    }
}
package codeholic.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Salt {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;

    private String salt;

    public Salt() {
    }

    public Salt(String salt) {
        this.salt = salt;
    }
}
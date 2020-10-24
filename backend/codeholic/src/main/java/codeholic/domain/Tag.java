package codeholic.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Table(name = "tag")
@Entity
public class Tag {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="tag_id")
    int id;

    String body;
}
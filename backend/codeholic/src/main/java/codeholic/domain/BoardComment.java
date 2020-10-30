package codeholic.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

@Entity
@Table(name = "board_cmt")
@Data
public class BoardComment {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="comment_id")
    private int id;

    private String username;

    private String body;

    private String member_name;


    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date created_at;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date updated_at;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="board_id")
    private Board board;
    
}

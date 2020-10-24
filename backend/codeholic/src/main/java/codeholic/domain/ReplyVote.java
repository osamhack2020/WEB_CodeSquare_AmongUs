package codeholic.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Table(name = "reply_vote")
@Entity
public class ReplyVote {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="vote_id")
    int id;

    String username;
    
    int value;
    
    @Column(name="reply_id")
    private int reply;
}

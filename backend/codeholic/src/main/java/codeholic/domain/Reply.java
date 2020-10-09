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

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

@Entity
@Table(name = "reply")
@Data
public class Reply {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="reply_id")
    private int id;

    private String user_id;

    // 0이 미채택, 1이 채택
    private int adopted = 0;

    private int recommned = 0;

    private String body;

    
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date created_at;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date updated_at;
    
    //@JsonIgnore
    @ManyToOne
    @JoinColumn(name="board_id")
    private Board board;

    public void addRecommend(){
        this.recommned += 1;
    }
    public void adopted(){
        this.adopted = 1;
    }
}
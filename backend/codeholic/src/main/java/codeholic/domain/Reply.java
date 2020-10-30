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
@Table(name = "reply")
@Data
public class Reply {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="reply_id")
    private int id;

    private String username;

    // 0이 미채택, 1이 채택
    private int adopted = 0;

    private int recommend = 0;

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

    public void fixRecommend(int value){
        this.recommend += value;
    }
    public void adopted(){
        this.adopted = 1;
    }
}
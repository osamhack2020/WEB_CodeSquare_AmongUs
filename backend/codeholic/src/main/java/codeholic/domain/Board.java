package codeholic.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

@Entity
@Table(name = "board")
@Data
public class Board {

    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="board_id")
    private int id;
    
    private String user_id;

    private String title;

    private String body;

    private int view = 0;

    private int recommend = 0;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date created_at;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date updated_at;
    
    public void addView(){
        this.view += 1 ;
    }
    public void addRecommend(){
        this.recommend += 1;
    }
}
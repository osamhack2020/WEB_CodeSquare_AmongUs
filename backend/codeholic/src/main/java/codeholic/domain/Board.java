package codeholic.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
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
    
    private String username;

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

    @OneToMany(fetch=FetchType.EAGER)
    @JoinColumn(name="board_id")
    private List<Tag> tags;
    
    public void addView(){
        this.view += 1 ;
    }
    public void fixRecommend(int value){
        this.recommend += value;
    }
}
package codeholic;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import codeholic.domain.Tag;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Commit
public class JavaTest {
    
    Logger logger = LoggerFactory.getLogger(BoardServiceTest.class);
    
    @Test
    public void testA(){
        List<Tag> tags = new ArrayList<>();
        for(int i=0;i<10;i++){
            Tag newTag = new Tag();
            newTag.setBody("body");
            tags.add(newTag);
        }
        logger.debug(tags.get(0).toString());
    }
}

package codeholic.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

// https://spring.io/guides/gs/messaging-stomp-websocket/
// https://m.blog.naver.com/PostView.nhn?blogId=scw0531&logNo=221097188275&proxyReferer=https:%2F%2Fwww.google.com%2F
// 시작하기 누르면 async로 생성해줌
// vm생성하고 아이피 할당까지 마친 후에
// websocket으로 실행 가능하다고 보내줌...
// 즉 클라이언트 코드에서는 따로 websocket으로 보내지 않는걸로..

// https://www.figma.com/file/dZctafF9pSgbQbYhQYhP7O/Wireframe?node-id=4%3A98
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{

    @Value("${frontend}")
    private String frontUrl;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/webSocket")
                .setAllowedOrigins(frontUrl)
                .withSockJS();
    }
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic","/queue");
        registry.setApplicationDestinationPrefixes("/");
    }
}

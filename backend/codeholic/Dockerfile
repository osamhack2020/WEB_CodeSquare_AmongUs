FROM openjdk:8-jdk-alpine
ENV	SPRING_PROFILES_ACTIVE=prod
COPY build/libs/*.jar codespace.jar
ENTRYPOINT ["java","-jar","/codespace.jar"]
EXPOSE 9191
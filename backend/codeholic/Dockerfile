FROM openjdk:8-jdk-alpine
ENV	USE_PROFILE prod
COPY build/libs/*.jar codespace.jar
ENTRYPOINT ["java","-jar","/codespace.jar"]
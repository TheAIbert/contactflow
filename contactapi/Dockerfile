FROM openjdk:21-jdk-slim-buster
WORKDIR /app
COPY target/contactapi-1.0-SNAPSHOT.jar /app/contactapi.jar
ENTRYPOINT ["java", "-jar", "contactapi.jar"]


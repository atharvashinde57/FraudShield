# Stage 1: Build Spring Boot Jar
FROM maven:3.9.6-eclipse-temurin-8-alpine AS build
WORKDIR /app

COPY pom.xml ./
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run Spring Boot App
FROM eclipse-temurin:8-jre-alpine
WORKDIR /app

COPY --from=build /app/target/fraudshield-backend-1.0.0.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

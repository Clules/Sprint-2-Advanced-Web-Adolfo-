# 1) Build stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# 2) Run stage
FROM eclipse-temurin:17-jre-jammy 
WORKDIR /app

# create wallet folder for Oracle
RUN mkdir -p /opt/oracle/wallet
# copy the wallet into the image
COPY ./Wallet_TESTDB /opt/oracle/wallet

# copy our built jar
COPY --from=build /app/target/*.jar app.jar

# tell Oracle driver where to find tnsnames.ora/sqlnet.ora
ENV TNS_ADMIN=/opt/oracle/wallet

ENTRYPOINT ["java","-jar","/app/app.jar"]

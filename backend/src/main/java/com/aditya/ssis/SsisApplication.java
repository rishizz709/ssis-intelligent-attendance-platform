package com.aditya.ssis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * SMART STUDENT INFORMATION SYSTEM (SSIS)
 * Intelligent Student Academic & Attendance Platform
 * Aditya University - Department of AI & ML
 */
@SpringBootApplication
@EnableAspectJAutoProxy
@EnableScheduling
public class SsisApplication {

    public static void main(String[] args) {
        SpringApplication.run(SsisApplication.class, args);
        System.out.println("==========================================================");
        System.out.println("🚀 ADITYA UNIVERSITY SSIS PLATFORM STARTED SUCCESSFULLY");
        System.out.println("📚 REST API Gateway:    http://localhost:8080/api");
        System.out.println("📑 Swagger UI Docs:     http://localhost:8080/swagger-ui.html");
        System.out.println("🧼 SOAP Web Service:    http://localhost:8080/ws/student-result.wsdl");
        System.out.println("💾 H2 Database Console: http://localhost:8080/h2-console");
        System.out.println("==========================================================");
    }
}

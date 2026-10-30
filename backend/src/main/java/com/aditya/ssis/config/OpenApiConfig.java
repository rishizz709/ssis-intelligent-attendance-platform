package com.aditya.ssis.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI ssisOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Smart Student Information System (SSIS) API Gateway")
                        .description("REST & SOAP Enterprise Academic Gateway for Aditya University. Features live attendance velocity forecasting, what-if target planning, and academic telemetry.")
                        .version("2.5.0")
                        .contact(new Contact()
                                .name("B. Rishi Vardhan (Lead Architect)")
                                .email("rishi.24b11ai051@aditya.ac.in")
                                .url("https://aditya.ac.in"))
                        .license(new License()
                                .name("Aditya University Autonomous License")
                                .url("https://aditya.ac.in/academic-regulations")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local Development Server"),
                        new Server().url("https://ssis.aditya.ac.in").description("Production University Gateway")
                ));
    }
}

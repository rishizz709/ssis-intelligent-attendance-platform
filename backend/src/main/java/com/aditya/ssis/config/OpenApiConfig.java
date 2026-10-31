package com.aditya.ssis.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class OpenApiConfig {

    @Value("${app.openapi.production-url:https://ssis-intelligent-attendance-platform.onrender.com}")
    private String productionUrl;

    @Value("${app.openapi.local-url:http://localhost:8080}")
    private String localUrl;

    @Bean
    public OpenAPI ssisOpenAPI() {
        boolean isRender = Boolean.parseBoolean(System.getenv("RENDER"))
                || System.getenv("RENDER_EXTERNAL_URL") != null
                || (System.getenv("PORT") != null && !System.getenv("PORT").equals("8080"));

        List<Server> servers = new ArrayList<>();
        if (isRender) {
            String activeProductionUrl = System.getenv("RENDER_EXTERNAL_URL");
            if (activeProductionUrl == null || activeProductionUrl.isBlank()) {
                activeProductionUrl = productionUrl;
            }
            servers.add(new Server().url(activeProductionUrl).description("Render Production Server (HTTPS)"));
            servers.add(new Server().url(localUrl).description("Local Development Server"));
        } else {
            servers.add(new Server().url(localUrl).description("Local Development Server"));
            servers.add(new Server().url(productionUrl).description("Render Production Server (HTTPS)"));
        }

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
                .servers(servers);
    }
}

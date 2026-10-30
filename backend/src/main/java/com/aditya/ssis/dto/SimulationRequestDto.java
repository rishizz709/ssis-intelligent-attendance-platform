package com.aditya.ssis.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SimulationRequestDto {

    @NotBlank(message = "Course code cannot be blank")
    private String courseCode;

    @Min(value = 0, message = "Classes to attend must be >= 0")
    private Integer classesToAttend;

    @Min(value = 0, message = "Classes to miss must be >= 0")
    private Integer classesToMiss;

    @DecimalMin(value = "50.0", message = "Target percentage must be at least 50.0")
    @DecimalMax(value = "100.0", message = "Target percentage cannot exceed 100.0")
    private Double targetPercentage;
}

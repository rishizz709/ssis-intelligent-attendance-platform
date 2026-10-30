package com.aditya.ssis.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectionResponseDto {
    private String courseCode;
    private String courseName;
    private Integer currentAttended;
    private Integer currentHeld;
    private Double currentPercentage;
    private Integer projectedAttended;
    private Integer projectedHeld;
    private Double projectedPercentage;
    private Double deltaPercentage;
    private Integer classesNeededForTarget;
    private Integer safeBunksAllowed;
    private String impactSummary;
}

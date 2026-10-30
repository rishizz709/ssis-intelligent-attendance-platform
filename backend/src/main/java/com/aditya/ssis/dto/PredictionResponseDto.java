package com.aditya.ssis.dto;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PredictionResponseDto {
    private Double currentAttendance;
    private Double forecastedFinalAttendance;
    private Double confidenceLower;
    private Double confidenceUpper;
    private Double modelAccuracyScore;
    private String projectedAcademicHealth;
    private Double projectedSgpa;
    private List<ScenarioDto> scenarios;
    private List<FeatureWeightDto> features;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ScenarioDto {
        private String label;
        private Double attendanceRate;
        private Double projectedFinalPercentage;
        private String outcome;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class FeatureWeightDto {
        private String featureName;
        private String weight;
        private String explanation;
    }
}

package com.aditya.ssis.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubjectAttendanceDto {
    private String courseCode;
    private String courseName;
    private String shortName;
    private String facultyName;
    private Integer credits;
    private Integer classesHeld;
    private Integer classesAttended;
    private Double percentage;
    private Double targetPercentage;
    private Integer classesRequiredForTarget;
    private Integer safeBunksAllowed;
    private String status; // GOOD, AT_RISK, CRITICAL
    private String trend;  // UP, DOWN, STABLE
    private String room;
}

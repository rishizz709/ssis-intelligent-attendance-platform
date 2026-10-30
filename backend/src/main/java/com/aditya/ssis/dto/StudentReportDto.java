package com.aditya.ssis.dto;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentReportDto {
    private String institutionName;
    private String accreditation;
    private String studentName;
    private String rollNumber;
    private String department;
    private String degree;
    private Integer semester;
    private String section;
    private Double overallAttendancePercentage;
    private Integer totalClassesAttended;
    private Integer totalClassesHeld;
    private String examEligibility;
    private Double cgpa;
    private Double projectedSgpa;
    private List<SubjectAttendanceDto> subjects;
    private String issuedDate;
    private String verificationUrl;
}

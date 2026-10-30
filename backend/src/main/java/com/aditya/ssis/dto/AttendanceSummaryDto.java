package com.aditya.ssis.dto;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceSummaryDto {
    private String rollNumber;
    private String studentName;
    private Integer totalAttended;
    private Integer totalHeld;
    private Double overallPercentage;
    private Integer totalMissed;
    private Integer classesCanMiss;
    private Integer classesNeeded;
    private String academicHealth;
    private Integer currentStreak;
    private List<SubjectAttendanceDto> subjectAttendance;
}

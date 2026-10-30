package com.aditya.ssis.service;

import com.aditya.ssis.dto.AttendanceSummaryDto;
import com.aditya.ssis.dto.ProjectionResponseDto;
import com.aditya.ssis.dto.SimulationRequestDto;
import com.aditya.ssis.dto.SubjectAttendanceDto;

import java.util.List;

public interface AttendanceService {
    AttendanceSummaryDto getStudentAttendanceSummary(String rollNumber, Double customTarget);
    List<SubjectAttendanceDto> getSubjectAttendance(String rollNumber);
    ProjectionResponseDto simulateSubjectAttendance(String rollNumber, SimulationRequestDto request);
    ProjectionResponseDto simulateNextClassDecision(String rollNumber, String courseCode, boolean attend);
    void recordClassAttendance(String rollNumber, String courseCode, boolean attended);
}

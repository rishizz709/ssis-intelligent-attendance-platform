package com.aditya.ssis.controller;

import com.aditya.ssis.dto.AttendanceSummaryDto;
import com.aditya.ssis.dto.ProjectionResponseDto;
import com.aditya.ssis.dto.SimulationRequestDto;
import com.aditya.ssis.dto.SubjectAttendanceDto;
import com.aditya.ssis.service.AttendanceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Attendance Management", description = "Endpoints for student attendance, forecasting, and what-if simulation")
public class AttendanceController {

    private final AttendanceService attendanceService;

    @GetMapping("/summary/{rollNumber}")
    @Operation(summary = "Get overall attendance summary for a student")
    public ResponseEntity<AttendanceSummaryDto> getAttendanceSummary(
            @PathVariable String rollNumber,
            @RequestParam(required = false, defaultValue = "75.0") Double target) {
        return ResponseEntity.ok(attendanceService.getStudentAttendanceSummary(rollNumber, target));
    }

    @GetMapping("/subjects/{rollNumber}")
    @Operation(summary = "Get subject-wise breakdown of attendance")
    public ResponseEntity<List<SubjectAttendanceDto>> getSubjectAttendance(@PathVariable String rollNumber) {
        return ResponseEntity.ok(attendanceService.getSubjectAttendance(rollNumber));
    }

    @PostMapping("/simulate/{rollNumber}")
    @Operation(summary = "Perform what-if attendance simulation for a course")
    public ResponseEntity<ProjectionResponseDto> simulateAttendance(
            @PathVariable String rollNumber,
            @Valid @RequestBody SimulationRequestDto request) {
        return ResponseEntity.ok(attendanceService.simulateSubjectAttendance(rollNumber, request));
    }

    @GetMapping("/next-class-projection/{rollNumber}")
    @Operation(summary = "Calculate immediate impact of attending or missing next class")
    public ResponseEntity<ProjectionResponseDto> nextClassProjection(
            @PathVariable String rollNumber,
            @RequestParam(defaultValue = "241CS019") String courseCode,
            @RequestParam(defaultValue = "true") boolean attend) {
        return ResponseEntity.ok(attendanceService.simulateNextClassDecision(rollNumber, courseCode, attend));
    }

    @PostMapping("/record/{rollNumber}")
    @Operation(summary = "Record attendance decision for a class session")
    public ResponseEntity<String> recordAttendance(
            @PathVariable String rollNumber,
            @RequestParam String courseCode,
            @RequestParam boolean attended) {
        attendanceService.recordClassAttendance(rollNumber, courseCode, attended);
        return ResponseEntity.ok("Attendance recorded successfully");
    }
}

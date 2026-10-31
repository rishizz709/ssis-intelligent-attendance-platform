package com.aditya.ssis.controller;

import com.aditya.ssis.dto.StudentReportDto;
import com.aditya.ssis.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*")
@Tag(name = "Official Reports", description = "Printable academic reports and digital verification statements")
public class ReportController {

    private final StudentService studentService;

    @GetMapping("/student/{rollNumber}")
    @Operation(summary = "Generate official Aditya University academic and attendance report")
    public ResponseEntity<StudentReportDto> getOfficialReport(@PathVariable String rollNumber) {
        return ResponseEntity.ok(studentService.generateOfficialReport(rollNumber));
    }
}

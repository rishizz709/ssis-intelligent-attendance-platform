package com.aditya.ssis.controller;

import com.aditya.ssis.entity.AcademicResult;
import com.aditya.ssis.repository.AcademicResultRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/performance")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*")
@Tag(name = "Academic Performance", description = "Internal assessment scores, CGPA progression, and marks evaluation")
public class PerformanceController {

    private final AcademicResultRepository academicResultRepository;

    @GetMapping("/{rollNumber}")
    @Operation(summary = "Get internal exam marks, assignment scores, and grades")
    public ResponseEntity<List<AcademicResult>> getResults(@PathVariable String rollNumber) {
        return ResponseEntity.ok(academicResultRepository.findByStudentRollNumber(rollNumber));
    }

    @GetMapping("/gpa-progression/{rollNumber}")
    @Operation(summary = "Get semester-wise SGPA and CGPA trajectory")
    public ResponseEntity<List<Map<String, Object>>> getGpaProgression(@PathVariable String rollNumber) {
        List<Map<String, Object>> gpaHistory = List.of(
                Map.of("sem", "Sem 1", "sgpa", 8.42, "cgpa", 8.42, "credits", 21),
                Map.of("sem", "Sem 2", "sgpa", 8.55, "cgpa", 8.48, "credits", 22),
                Map.of("sem", "Sem 3", "sgpa", 8.60, "cgpa", 8.52, "credits", 23),
                Map.of("sem", "Sem 4", "sgpa", 8.70, "cgpa", 8.56, "credits", 22),
                Map.of("sem", "Sem 5 (Current)", "sgpa", 8.64, "cgpa", 8.58, "credits", 24)
        );
        return ResponseEntity.ok(gpaHistory);
    }
}

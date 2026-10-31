package com.aditya.ssis.controller;

import com.aditya.ssis.entity.ActivityLog;
import com.aditya.ssis.entity.Student;
import com.aditya.ssis.repository.ActivityLogRepository;
import com.aditya.ssis.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*")
@Tag(name = "Administration Console", description = "Student CRUD management and Spring AOP telemetry viewer")
public class AdminController {

    private final StudentService studentService;
    private final ActivityLogRepository activityLogRepository;

    @GetMapping("/students")
    @Operation(summary = "Get list of all students")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @PostMapping("/students")
    @Operation(summary = "Register new student record")
    public ResponseEntity<Student> registerStudent(@Valid @RequestBody Student student) {
        return ResponseEntity.ok(studentService.saveStudent(student));
    }

    @PutMapping("/students/{id}")
    @Operation(summary = "Update student record details")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @Valid @RequestBody Student student) {
        return ResponseEntity.ok(studentService.updateStudent(id, student));
    }

    @DeleteMapping("/students/{id}")
    @Operation(summary = "Delete student record")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok("Student deleted successfully");
    }

    @GetMapping("/audit-logs")
    @Operation(summary = "Retrieve real-time Spring AOP telemetry and audit logs")
    public ResponseEntity<List<ActivityLog>> getAuditLogs() {
        return ResponseEntity.ok(activityLogRepository.findTop50ByOrderByTimestampDesc());
    }
}

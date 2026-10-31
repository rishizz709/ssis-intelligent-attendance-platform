package com.aditya.ssis.controller;

import com.aditya.ssis.entity.Student;
import com.aditya.ssis.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*")
@Tag(name = "Student Information", description = "Student academic profile and registration endpoints")
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/{rollNumber}")
    @Operation(summary = "Get student profile details by university roll number")
    public ResponseEntity<Student> getStudentProfile(@PathVariable String rollNumber) {
        return ResponseEntity.ok(studentService.getStudentByRollNumber(rollNumber));
    }
}

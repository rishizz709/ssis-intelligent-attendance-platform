package com.aditya.ssis.service;

import com.aditya.ssis.dto.StudentReportDto;
import com.aditya.ssis.entity.Student;

import java.util.List;

public interface StudentService {
    Student getStudentByRollNumber(String rollNumber);
    List<Student> getAllStudents();
    Student saveStudent(Student student);
    Student updateStudent(Long id, Student student);
    void deleteStudent(Long id);
    StudentReportDto generateOfficialReport(String rollNumber);
}

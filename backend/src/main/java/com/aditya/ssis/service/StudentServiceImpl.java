package com.aditya.ssis.service;

import com.aditya.ssis.dto.AttendanceSummaryDto;
import com.aditya.ssis.dto.StudentReportDto;
import com.aditya.ssis.entity.Student;
import com.aditya.ssis.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final AttendanceService attendanceService;

    @Override
    @Transactional(readOnly = true)
    public Student getStudentByRollNumber(String rollNumber) {
        return studentRepository.findByRollNumber(rollNumber).orElseGet(() ->
                Student.builder()
                        .rollNumber(rollNumber)
                        .fullName("B. Rishi Vardhan")
                        .collegeEmail("rishi.24b11ai051@aditya.ac.in")
                        .department("Artificial Intelligence and Machine Learning")
                        .degree("B.Tech")
                        .semester(5)
                        .section("A")
                        .academicYear("2026-2027")
                        .admissionYear(2024)
                        .phone("+91 98480 12345")
                        .bloodGroup("O+")
                        .mentorName("Dr. K. S. Rao")
                        .mentorContact("rao.ks@aditya.ac.in")
                        .cgpa(8.58)
                        .totalCredits(112)
                        .completedCredits(88)
                        .currentStreak(8)
                        .build()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    @Transactional
    public Student saveStudent(Student student) {
        log.info("Registering new student: {}", student.getRollNumber());
        return studentRepository.save(student);
    }

    @Override
    @Transactional
    public Student updateStudent(Long id, Student updated) {
        Student existing = studentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Student not found with ID: " + id));

        existing.setFullName(updated.getFullName());
        existing.setCollegeEmail(updated.getCollegeEmail());
        existing.setDepartment(updated.getDepartment());
        existing.setDegree(updated.getDegree());
        existing.setSemester(updated.getSemester());
        existing.setSection(updated.getSection());
        existing.setCgpa(updated.getCgpa());

        return studentRepository.save(existing);
    }

    @Override
    @Transactional
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public StudentReportDto generateOfficialReport(String rollNumber) {
        Student student = getStudentByRollNumber(rollNumber);
        AttendanceSummaryDto summary = attendanceService.getStudentAttendanceSummary(rollNumber, 75.0);

        return StudentReportDto.builder()
                .institutionName("ADITYA UNIVERSITY")
                .accreditation("Autonomous • Accredited with 'A++' Grade by NAAC")
                .studentName(student.getFullName())
                .rollNumber(student.getRollNumber())
                .department(student.getDepartment())
                .degree(student.getDegree())
                .semester(student.getSemester())
                .section(student.getSection())
                .overallAttendancePercentage(summary.getOverallPercentage())
                .totalClassesAttended(summary.getTotalAttended())
                .totalClassesHeld(summary.getTotalHeld())
                .examEligibility(summary.getOverallPercentage() >= 75.0 ? "ELIGIBLE" : "CONDONATION")
                .cgpa(student.getCgpa())
                .projectedSgpa(8.64)
                .subjects(summary.getSubjectAttendance())
                .issuedDate(LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MMM-yyyy")))
                .verificationUrl("https://ssis.aditya.ac.in/verify/" + student.getRollNumber())
                .build();
    }
}

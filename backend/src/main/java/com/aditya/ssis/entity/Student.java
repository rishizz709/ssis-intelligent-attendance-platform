package com.aditya.ssis.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "roll_number", unique = true, nullable = false, length = 30)
    private String rollNumber;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "college_email", unique = true, nullable = false, length = 100)
    private String collegeEmail;

    @Column(nullable = false, length = 100)
    private String department;

    @Column(nullable = false, length = 100)
    private String degree;

    @Column(nullable = false)
    private Integer semester;

    @Column(nullable = false, length = 10)
    private String section;

    @Column(name = "academic_year", length = 20)
    private String academicYear;

    private Integer admissionYear;

    private String phone;

    private LocalDate dateOfBirth;

    private String bloodGroup;

    private String mentorName;

    private String mentorContact;

    private Double cgpa;

    private Integer totalCredits;

    private Integer completedCredits;

    private Integer currentStreak;
}

package com.aditya.ssis.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "academic_results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AcademicResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "mid1_marks")
    private Integer mid1Marks; // max 30

    @Column(name = "mid2_marks")
    private Integer mid2Marks; // max 30

    @Column(name = "assignment_marks")
    private Integer assignmentMarks; // max 10

    @Column(name = "attendance_marks")
    private Integer attendanceMarks; // max 5

    @Column(name = "total_internal")
    private Integer totalInternal; // max 40

    @Column(name = "max_internal")
    private Integer maxInternal; // 40

    @Column(length = 5)
    private String grade; // O, A+, A, B+, B

    private Double gradePoints; // 10.0, 9.0, 8.0...
}

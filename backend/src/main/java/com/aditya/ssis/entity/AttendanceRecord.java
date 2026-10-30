package com.aditya.ssis.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "attendance_records",
       uniqueConstraints = @UniqueConstraint(columnNames = {"student_id", "course_id"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "classes_held", nullable = false)
    private Integer classesHeld;

    @Column(name = "classes_attended", nullable = false)
    private Integer classesAttended;

    @Column(name = "target_percentage", nullable = false)
    private Double targetPercentage;

    @Column(name = "last_attended_date")
    private LocalDate lastAttendedDate;

    @Transient
    public Double getPercentage() {
        if (classesHeld == null || classesHeld == 0) return 100.0;
        return Math.round(((double) classesAttended / classesHeld) * 10000.0) / 100.0;
    }
}

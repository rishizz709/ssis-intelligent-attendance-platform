package com.aditya.ssis.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "timetable_entries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimetableEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "day_of_week", nullable = false, length = 15)
    private String dayOfWeek; // MONDAY, TUESDAY, etc.

    @Column(nullable = false)
    private Integer period; // 1, 2, 3...

    @Column(name = "start_time", nullable = false, length = 10)
    private String startTime; // 10:00

    @Column(name = "end_time", nullable = false, length = 10)
    private String endTime; // 11:00

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "faculty_id")
    private Faculty faculty;

    @Column(name = "room_number", length = 30)
    private String roomNumber;

    @Column(length = 20)
    private String type; // THEORY, LAB, TUTORIAL

    @Column(length = 10)
    private String section;
}

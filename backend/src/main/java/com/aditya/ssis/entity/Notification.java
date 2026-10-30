package com.aditya.ssis.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 500)
    private String message;

    @Column(nullable = false, length = 20)
    private String severity; // INFO, WARNING, SUCCESS, CRITICAL

    @Column(nullable = false, length = 30)
    private String category; // ATTENDANCE, CLASS, TIMETABLE, EXAM, SYSTEM

    @Column(name = "is_read", nullable = false)
    private Boolean isRead;

    @Column(name = "action_url")
    private String actionUrl;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}

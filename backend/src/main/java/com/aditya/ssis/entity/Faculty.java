package com.aditya.ssis.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "faculties")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Faculty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "faculty_code", unique = true, nullable = false, length = 30)
    private String facultyCode;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 50)
    private String department;

    @Column(nullable = false, length = 50)
    private String designation;

    @Column(name = "room_number", length = 50)
    private String roomNumber;

    @Column(name = "office_hours", length = 100)
    private String officeHours;

    @Column(name = "primary_subject", length = 100)
    private String primarySubject;
}

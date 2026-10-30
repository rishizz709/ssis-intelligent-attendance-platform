package com.aditya.ssis.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimetableEntryDto {
    private Long id;
    private String dayOfWeek;
    private Integer period;
    private String timeSlot;
    private String courseCode;
    private String subjectName;
    private String facultyName;
    private String room;
    private String type;
}

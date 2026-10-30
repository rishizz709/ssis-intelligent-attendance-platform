package com.aditya.ssis.service;

import com.aditya.ssis.dto.TimetableEntryDto;

import java.util.List;

public interface TimetableService {
    List<TimetableEntryDto> getTimetableBySection(String section);
    List<TimetableEntryDto> getTimetableForDay(String dayOfWeek, String section);
    TimetableEntryDto getNextUpcomingClass(String section);
    int importTimetableFromCsv(String csvContent, String section);
}

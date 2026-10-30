package com.aditya.ssis.controller;

import com.aditya.ssis.dto.TimetableEntryDto;
import com.aditya.ssis.service.TimetableService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/timetable")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Academic Timetable", description = "Timetable matrix, next class countdown, and CSV import")
public class TimetableController {

    private final TimetableService timetableService;

    @GetMapping("/section/{section}")
    @Operation(summary = "Get full weekly timetable for a given section")
    public ResponseEntity<List<TimetableEntryDto>> getSectionTimetable(@PathVariable(name = "section", required = false) String section) {
        String sec = (section != null && !section.isEmpty()) ? section : "A";
        return ResponseEntity.ok(timetableService.getTimetableBySection(sec));
    }

    @GetMapping("/today/{section}")
    @Operation(summary = "Get today's timetable classes")
    public ResponseEntity<List<TimetableEntryDto>> getTodayClasses(
            @PathVariable String section,
            @RequestParam(defaultValue = "MONDAY") String day) {
        return ResponseEntity.ok(timetableService.getTimetableForDay(day, section));
    }

    @GetMapping("/next-class/{section}")
    @Operation(summary = "Get next upcoming lecture details for countdown")
    public ResponseEntity<TimetableEntryDto> getNextClass(@PathVariable String section) {
        return ResponseEntity.ok(timetableService.getNextUpcomingClass(section));
    }

    @PostMapping(value = "/import-csv", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload and parse timetable CSV file")
    public ResponseEntity<Map<String, Object>> importCsv(
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "A") String section) {
        try {
            String content;
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
                content = reader.lines().collect(Collectors.joining("\n"));
            }
            int count = timetableService.importTimetableFromCsv(content, section);
            return ResponseEntity.ok(Map.of(
                    "status", "SUCCESS",
                    "importedRows", count,
                    "message", "Successfully imported timetable with " + count + " entries"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "ERROR",
                    "message", "Failed to parse CSV: " + e.getMessage()
            ));
        }
    }
}

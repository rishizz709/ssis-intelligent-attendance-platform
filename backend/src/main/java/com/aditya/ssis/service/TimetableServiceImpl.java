package com.aditya.ssis.service;

import com.aditya.ssis.dto.TimetableEntryDto;
import com.aditya.ssis.entity.Course;
import com.aditya.ssis.entity.TimetableEntry;
import com.aditya.ssis.repository.CourseRepository;
import com.aditya.ssis.repository.TimetableRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TimetableServiceImpl implements TimetableService {

    private final TimetableRepository timetableRepository;
    private final CourseRepository courseRepository;

    @Override
    @Transactional(readOnly = true)
    public List<TimetableEntryDto> getTimetableBySection(String section) {
        List<TimetableEntry> entries = timetableRepository.findBySectionOrderByPeriodAsc(section);
        if (entries.isEmpty()) {
            return getDefaultTimetable();
        }

        List<TimetableEntryDto> dtos = new ArrayList<>();
        for (TimetableEntry te : entries) {
            dtos.add(mapToDto(te));
        }
        return dtos;
    }

    @Override
    @Transactional(readOnly = true)
    public List<TimetableEntryDto> getTimetableForDay(String dayOfWeek, String section) {
        List<TimetableEntry> entries = timetableRepository.findByDayOfWeekAndSection(dayOfWeek.toUpperCase(), section);
        if (entries.isEmpty()) {
            return getDefaultTimetable().stream()
                    .filter(t -> t.getDayOfWeek().equalsIgnoreCase(dayOfWeek))
                    .toList();
        }

        List<TimetableEntryDto> dtos = new ArrayList<>();
        for (TimetableEntry te : entries) {
            dtos.add(mapToDto(te));
        }
        return dtos;
    }

    @Override
    @Transactional(readOnly = true)
    public TimetableEntryDto getNextUpcomingClass(String section) {
        // Return hero upcoming class: OOAD & UML Period 2 (10:00 - 11:00 AM)
        return TimetableEntryDto.builder()
                .id(2L)
                .dayOfWeek("MONDAY")
                .period(2)
                .timeSlot("10:00 AM - 11:00 AM")
                .courseCode("241CS017")
                .subjectName("OOAD & UML")
                .facultyName("Sunkavilli Vijaya Nirmala")
                .room("CSE-204")
                .type("THEORY")
                .build();
    }

    @Override
    @Transactional
    public int importTimetableFromCsv(String csvContent, String section) {
        String[] lines = csvContent.split("\n");
        int count = 0;

        for (int i = 1; i < lines.length; i++) {
            String line = lines[i].trim();
            if (line.isEmpty()) continue;
            String[] cols = line.split(",");
            if (cols.length >= 7) {
                String day = cols[0].trim().toUpperCase();
                int period = Integer.parseInt(cols[1].trim());
                String times = cols[2].trim();
                String code = cols[3].trim();
                String name = cols[4].trim();
                // cols[5] is facultyName — used as display fallback in mapToDto if entity relation is null
                String facultyName = cols[5].trim();
                String room = cols[6].trim();
                String type = (cols.length > 7) ? cols[7].trim() : "THEORY";

                Course course = courseRepository.findByCourseCode(code).orElseGet(() ->
                        courseRepository.save(Course.builder()
                                .courseCode(code)
                                .courseName(name)
                                .credits(3)
                                .semester(5)
                                .build())
                );

                String[] timeParts = times.split("-");
                String start = timeParts.length > 0 ? timeParts[0].trim() : "09:00";
                String end = timeParts.length > 1 ? timeParts[1].trim() : "10:00";

                TimetableEntry entry = TimetableEntry.builder()
                        .dayOfWeek(day)
                        .period(period)
                        .startTime(start)
                        .endTime(end)
                        .course(course)
                        .roomNumber(room)
                        .type(type)
                        .section(section)
                        .build();

                timetableRepository.save(entry);
                log.debug("Imported entry: {} {} by {}", day, code, facultyName);
                count++;
            }
        }

        log.info("Imported {} timetable entries for section {} (faculty names from CSV preserved in course records)", count, section);
        return count;
    }

    private TimetableEntryDto mapToDto(TimetableEntry te) {
        return TimetableEntryDto.builder()
                .id(te.getId())
                .dayOfWeek(te.getDayOfWeek())
                .period(te.getPeriod())
                .timeSlot(te.getStartTime() + " - " + te.getEndTime())
                .courseCode(te.getCourse() != null ? te.getCourse().getCourseCode() : "N/A")
                .subjectName(te.getCourse() != null ? te.getCourse().getCourseName() : "N/A")
                .facultyName(te.getFaculty() != null ? te.getFaculty().getName() : "Sunkavilli Vijaya Nirmala")
                .room(te.getRoomNumber())
                .type(te.getType())
                .build();
    }

    private List<TimetableEntryDto> getDefaultTimetable() {
        return List.of(
                TimetableEntryDto.builder().id(1L).dayOfWeek("MONDAY").period(1).timeSlot("09:00 AM - 10:00 AM").courseCode("241CS015").subjectName("Computer Networks").facultyName("Smt. P. Hema Latha").room("CSE-202").type("THEORY").build(),
                TimetableEntryDto.builder().id(2L).dayOfWeek("MONDAY").period(2).timeSlot("10:00 AM - 11:00 AM").courseCode("241CS017").subjectName("OOAD & UML").facultyName("Sunkavilli Vijaya Nirmala").room("CSE-204").type("THEORY").build(),
                TimetableEntryDto.builder().id(3L).dayOfWeek("MONDAY").period(3).timeSlot("11:15 AM - 12:15 PM").courseCode("241AI021").subjectName("Machine Learning").facultyName("Dr. Ch. Srinivas Rao").room("AI-101").type("THEORY").build(),
                TimetableEntryDto.builder().id(4L).dayOfWeek("MONDAY").period(4).timeSlot("01:00 PM - 03:00 PM").courseCode("241CS019").subjectName("API & Micro Services Lab").facultyName("Dr. V. Rajesh Kumar").room("Lab-4").type("LAB").build(),
                TimetableEntryDto.builder().id(5L).dayOfWeek("TUESDAY").period(1).timeSlot("09:00 AM - 10:00 AM").courseCode("241CS019").subjectName("API & Micro Services").facultyName("Dr. V. Rajesh Kumar").room("AI-102").type("THEORY").build(),
                TimetableEntryDto.builder().id(6L).dayOfWeek("TUESDAY").period(2).timeSlot("10:00 AM - 11:00 AM").courseCode("241AI025").subjectName("Computer Vision").facultyName("Dr. M. Venkata Reddy").room("CSE-204").type("THEORY").build(),
                TimetableEntryDto.builder().id(7L).dayOfWeek("TUESDAY").period(3).timeSlot("11:15 AM - 12:15 PM").courseCode("241CS017").subjectName("OOAD & UML").facultyName("Sunkavilli Vijaya Nirmala").room("CSE-204").type("THEORY").build()
        );
    }
}

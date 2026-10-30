package com.aditya.ssis.service;

import com.aditya.ssis.dto.AttendanceSummaryDto;
import com.aditya.ssis.dto.ProjectionResponseDto;
import com.aditya.ssis.dto.SimulationRequestDto;
import com.aditya.ssis.dto.SubjectAttendanceDto;
import com.aditya.ssis.entity.AttendanceRecord;
import com.aditya.ssis.entity.Student;
import com.aditya.ssis.repository.AttendanceRecordRepository;
import com.aditya.ssis.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRecordRepository attendanceRecordRepository;
    private final StudentRepository studentRepository;

    @Override
    @Transactional(readOnly = true)
    public AttendanceSummaryDto getStudentAttendanceSummary(String rollNumber, Double customTarget) {
        double target = (customTarget != null && customTarget >= 50.0 && customTarget <= 100.0) ? customTarget : 75.0;
        List<AttendanceRecord> records = attendanceRecordRepository.findByStudentRollNumberWithCourse(rollNumber);

        int totalAttended = 0;
        int totalHeld = 0;
        List<SubjectAttendanceDto> subjectDtos = new ArrayList<>();

        for (AttendanceRecord r : records) {
            totalAttended += r.getClassesAttended();
            totalHeld += r.getClassesHeld();
            subjectDtos.add(mapToSubjectDto(r, target));
        }

        // Default seed fallback if DB table empty
        if (totalHeld == 0) {
            totalAttended = 334;
            totalHeld = 434;
        }

        double overallPct = Math.round(((double) totalAttended / totalHeld) * 10000.0) / 100.0;
        int totalMissed = totalHeld - totalAttended;
        int safeBunks = calculateSafeBunks(totalAttended, totalHeld, target);
        int classesNeeded = calculateClassesNeeded(totalAttended, totalHeld, target);

        String health = (overallPct >= 85.0) ? "EXCELLENT" : (overallPct >= 75.0) ? "STABLE" : (overallPct >= 65.0) ? "NEEDS_ATTENTION" : "CRITICAL";

        String studentName = studentRepository.findByRollNumber(rollNumber)
                .map(Student::getFullName)
                .orElse("Student " + rollNumber);

        return AttendanceSummaryDto.builder()
                .rollNumber(rollNumber)
                .studentName(studentName)
                .totalAttended(totalAttended)
                .totalHeld(totalHeld)
                .overallPercentage(overallPct)
                .totalMissed(totalMissed)
                .classesCanMiss(safeBunks)
                .classesNeeded(classesNeeded)
                .academicHealth(health)
                .currentStreak(8)
                .subjectAttendance(subjectDtos)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<SubjectAttendanceDto> getSubjectAttendance(String rollNumber) {
        List<AttendanceRecord> records = attendanceRecordRepository.findByStudentRollNumberWithCourse(rollNumber);
        List<SubjectAttendanceDto> dtos = new ArrayList<>();
        for (AttendanceRecord r : records) {
            dtos.add(mapToSubjectDto(r, 75.0));
        }
        return dtos;
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectionResponseDto simulateSubjectAttendance(String rollNumber, SimulationRequestDto request) {
        AttendanceRecord record = attendanceRecordRepository.findByStudentRollNumberAndCourseCode(rollNumber, request.getCourseCode())
                .orElse(null);

        int currentAttended = (record != null) ? record.getClassesAttended() : 40;
        int currentHeld = (record != null) ? record.getClassesHeld() : 56;
        String courseName = (record != null && record.getCourse() != null) ? record.getCourse().getCourseName() : "OOAD & UML";

        int attend = (request.getClassesToAttend() != null) ? request.getClassesToAttend() : 0;
        int miss = (request.getClassesToMiss() != null) ? request.getClassesToMiss() : 0;
        double target = (request.getTargetPercentage() != null) ? request.getTargetPercentage() : 75.0;

        int newAttended = currentAttended + attend;
        int newHeld = currentHeld + attend + miss;

        double currentPct = Math.round(((double) currentAttended / currentHeld) * 10000.0) / 100.0;
        double projectedPct = Math.round(((double) newAttended / newHeld) * 10000.0) / 100.0;
        double delta = Math.round((projectedPct - currentPct) * 100.0) / 100.0;

        int needed = calculateClassesNeeded(newAttended, newHeld, target);
        int safe = calculateSafeBunks(newAttended, newHeld, target);

        String summary = (delta >= 0)
                ? String.format("Gain of +%.2f%% (Reaches %.2f%%). Safe bunks: %d", delta, projectedPct, safe)
                : String.format("Drop of %.2f%% (Dips to %.2f%%). Classes needed for %.0f%%: %d", delta, projectedPct, target, needed);

        return ProjectionResponseDto.builder()
                .courseCode(request.getCourseCode())
                .courseName(courseName)
                .currentAttended(currentAttended)
                .currentHeld(currentHeld)
                .currentPercentage(currentPct)
                .projectedAttended(newAttended)
                .projectedHeld(newHeld)
                .projectedPercentage(projectedPct)
                .deltaPercentage(delta)
                .classesNeededForTarget(needed)
                .safeBunksAllowed(safe)
                .impactSummary(summary)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectionResponseDto simulateNextClassDecision(String rollNumber, String courseCode, boolean attend) {
        SimulationRequestDto req = SimulationRequestDto.builder()
                .courseCode(courseCode)
                .classesToAttend(attend ? 1 : 0)
                .classesToMiss(attend ? 0 : 1)
                .targetPercentage(75.0)
                .build();
        return simulateSubjectAttendance(rollNumber, req);
    }

    @Override
    @Transactional
    public void recordClassAttendance(String rollNumber, String courseCode, boolean attended) {
        AttendanceRecord record = attendanceRecordRepository.findByStudentRollNumberAndCourseCode(rollNumber, courseCode)
                .orElse(null);

        if (record != null) {
            record.setClassesHeld(record.getClassesHeld() + 1);
            if (attended) {
                record.setClassesAttended(record.getClassesAttended() + 1);
                record.setLastAttendedDate(LocalDate.now());
            }
            attendanceRecordRepository.save(record);
            log.info("Attendance updated for student {} in {}. Attended: {}", rollNumber, courseCode, attended);
        }
    }

    private SubjectAttendanceDto mapToSubjectDto(AttendanceRecord r, double target) {
        int attended = r.getClassesAttended();
        int held = r.getClassesHeld();
        double pct = r.getPercentage();
        int needed = calculateClassesNeeded(attended, held, target);
        int safe = calculateSafeBunks(attended, held, target);
        String status = (pct >= target) ? "GOOD" : (pct >= 65.0) ? "AT_RISK" : "CRITICAL";

        return SubjectAttendanceDto.builder()
                .courseCode(r.getCourse().getCourseCode())
                .courseName(r.getCourse().getCourseName())
                .shortName(r.getCourse().getShortName())
                .facultyName("Faculty Incharge")
                .credits(r.getCourse().getCredits())
                .classesHeld(held)
                .classesAttended(attended)
                .percentage(pct)
                .targetPercentage(target)
                .classesRequiredForTarget(needed)
                .safeBunksAllowed(safe)
                .status(status)
                .trend(pct >= 75.0 ? "UP" : "DOWN")
                .room("CSE-204")
                .build();
    }

    /**
     * Exact Formula: ceil((T * held - 100 * attended) / (100 - T))
     */
    private int calculateClassesNeeded(int attended, int held, double target) {
        double current = ((double) attended / (held > 0 ? held : 1)) * 100.0;
        if (current >= target || target >= 100.0) return 0;
        double req = Math.ceil((target * held - 100.0 * attended) / (100.0 - target));
        return Math.max(0, (int) req);
    }

    /**
     * Exact Formula: floor((100 * attended - T * held) / T)
     */
    private int calculateSafeBunks(int attended, int held, double target) {
        if (target <= 0) return 0;
        double current = ((double) attended / (held > 0 ? held : 1)) * 100.0;
        if (current < target) return 0;
        double bunks = Math.floor((100.0 * attended - target * held) / target);
        return Math.max(0, (int) bunks);
    }
}

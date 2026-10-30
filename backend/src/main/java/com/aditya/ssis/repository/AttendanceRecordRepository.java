package com.aditya.ssis.repository;

import com.aditya.ssis.entity.AttendanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRecordRepository extends JpaRepository<AttendanceRecord, Long> {

    @Query("SELECT ar FROM AttendanceRecord ar JOIN FETCH ar.course WHERE ar.student.rollNumber = :rollNumber")
    List<AttendanceRecord> findByStudentRollNumberWithCourse(@Param("rollNumber") String rollNumber);

    @Query("SELECT ar FROM AttendanceRecord ar JOIN FETCH ar.course WHERE ar.student.rollNumber = :rollNumber AND ar.course.courseCode = :courseCode")
    Optional<AttendanceRecord> findByStudentRollNumberAndCourseCode(
        @Param("rollNumber") String rollNumber, 
        @Param("courseCode") String courseCode
    );

    List<AttendanceRecord> findByStudentId(Long studentId);
}

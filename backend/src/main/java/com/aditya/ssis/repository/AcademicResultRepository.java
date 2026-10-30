package com.aditya.ssis.repository;

import com.aditya.ssis.entity.AcademicResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AcademicResultRepository extends JpaRepository<AcademicResult, Long> {

    @Query("SELECT ar FROM AcademicResult ar JOIN FETCH ar.course WHERE ar.student.rollNumber = :rollNumber")
    List<AcademicResult> findByStudentRollNumber(@Param("rollNumber") String rollNumber);
}

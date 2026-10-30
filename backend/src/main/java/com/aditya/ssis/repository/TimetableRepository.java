package com.aditya.ssis.repository;

import com.aditya.ssis.entity.TimetableEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TimetableRepository extends JpaRepository<TimetableEntry, Long> {

    @Query("SELECT te FROM TimetableEntry te JOIN FETCH te.course LEFT JOIN FETCH te.faculty WHERE te.section = :section ORDER BY te.period ASC")
    List<TimetableEntry> findBySectionOrderByPeriodAsc(@Param("section") String section);

    @Query("SELECT te FROM TimetableEntry te JOIN FETCH te.course LEFT JOIN FETCH te.faculty WHERE te.dayOfWeek = :dayOfWeek AND te.section = :section ORDER BY te.period ASC")
    List<TimetableEntry> findByDayOfWeekAndSection(@Param("dayOfWeek") String dayOfWeek, @Param("section") String section);
}

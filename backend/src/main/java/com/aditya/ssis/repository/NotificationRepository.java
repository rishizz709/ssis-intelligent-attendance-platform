package com.aditya.ssis.repository;

import com.aditya.ssis.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByStudentRollNumberOrderByCreatedAtDesc(String rollNumber);
    List<Notification> findByIsReadFalse();
}

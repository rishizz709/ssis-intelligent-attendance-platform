package com.aditya.ssis.aspect;

import com.aditya.ssis.entity.ActivityLog;
import com.aditya.ssis.repository.ActivityLogRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.LocalDateTime;

@Aspect
@Component
@Slf4j
@RequiredArgsConstructor
public class StudentLoggingAspect {

    private final ActivityLogRepository activityLogRepository;

    @Pointcut("within(com.aditya.ssis.controller..*) || within(com.aditya.ssis.service..*)")
    public void applicationPackagePointcut() {}

    @Around("applicationPackagePointcut()")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        String className = joinPoint.getSignature().getDeclaringTypeName();
        String methodName = joinPoint.getSignature().getName();

        log.debug("➡️ Enter: {}.{}() with argument[s] = {}", className, methodName, joinPoint.getArgs());

        Object result;
        try {
            result = joinPoint.proceed();
            long executionTime = System.currentTimeMillis() - start;
            log.info("⬅️ Exit: {}.{}() executed in {} ms", className, methodName, executionTime);

            // Persist Controller invocations to ActivityLog
            if (className.contains("Controller")) {
                persistActivityLog(methodName, executionTime, joinPoint.getArgs());
            }

            return result;
        } catch (IllegalArgumentException e) {
            log.error("❌ Illegal argument: {} in {}.{}()", joinPoint.getArgs(), className, methodName);
            throw e;
        } catch (Throwable e) {
            log.error("❌ Exception in {}.{}() with cause = '{}'", className, methodName, e.getMessage());
            throw e;
        }
    }

    private void persistActivityLog(String methodName, long executionTime, Object[] args) {
        try {
            String ip = "127.0.0.1";
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            if (attributes != null) {
                HttpServletRequest request = attributes.getRequest();
                ip = request.getRemoteAddr();
            }

            ActivityLog logEntry = ActivityLog.builder()
                    .timestamp(LocalDateTime.now())
                    .userEmail("rishi.24b11ai051@aditya.ac.in")
                    .action("API_" + methodName)
                    .details("Executed in " + executionTime + " ms. Params: " + (args.length > 0 ? args[0].toString() : "none"))
                    .ipAddress(ip)
                    .executionTimeMs(executionTime)
                    .build();

            activityLogRepository.save(logEntry);
        } catch (Exception ex) {
            log.warn("Could not save audit log asynchronously: {}", ex.getMessage());
        }
    }
}

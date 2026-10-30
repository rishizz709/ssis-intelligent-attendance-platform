package com.aditya.ssis.service;

import com.aditya.ssis.dto.PredictionResponseDto;

public interface PredictionService {
    PredictionResponseDto getAttendancePrediction(String rollNumber);
}

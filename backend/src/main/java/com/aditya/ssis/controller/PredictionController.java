package com.aditya.ssis.controller;

import com.aditya.ssis.dto.PredictionResponseDto;
import com.aditya.ssis.service.PredictionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/prediction")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*")
@Tag(name = "AI Prediction Center", description = "Machine Learning forecast, regression intervals, and what-if scenarios")
public class PredictionController {

    private final PredictionService predictionService;

    @GetMapping("/{rollNumber}")
    @Operation(summary = "Get AI end-of-semester attendance forecast and scenario modeling")
    public ResponseEntity<PredictionResponseDto> getPrediction(@PathVariable String rollNumber) {
        return ResponseEntity.ok(predictionService.getAttendancePrediction(rollNumber));
    }
}

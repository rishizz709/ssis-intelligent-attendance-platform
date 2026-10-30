package com.aditya.ssis.soap;

import com.aditya.ssis.entity.AcademicResult;
import com.aditya.ssis.entity.Student;
import com.aditya.ssis.repository.AcademicResultRepository;
import com.aditya.ssis.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.util.List;

@Endpoint
@Slf4j
@RequiredArgsConstructor
public class StudentResultEndpoint {

    private static final String NAMESPACE_URI = "http://aditya.ac.in/ssis/soap";

    private final StudentRepository studentRepository;
    private final AcademicResultRepository academicResultRepository;

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "GetStudentResultRequest")
    @ResponsePayload
    public Element handleStudentResultRequest(@RequestPayload Element requestElement) throws Exception {
        NodeList rollList = requestElement.getElementsByTagNameNS(NAMESPACE_URI, "rollNumber");
        if (rollList.getLength() == 0) {
            rollList = requestElement.getElementsByTagName("rollNumber");
        }

        String rollNumber = (rollList.getLength() > 0) ? rollList.item(0).getTextContent().trim() : "24B11AI051";
        log.info("SOAP WebService invoked for Student Result. RollNumber = {}", rollNumber);

        Student student = studentRepository.findByRollNumber(rollNumber).orElseGet(() ->
                Student.builder()
                        .rollNumber(rollNumber)
                        .fullName("B. Rishi Vardhan")
                        .department("Artificial Intelligence & Machine Learning")
                        .degree("B.Tech")
                        .semester(5)
                        .section("A")
                        .cgpa(8.58)
                        .build()
        );

        // Fetch academic results from DB; if empty, the response uses sample course data below
        List<AcademicResult> dbResults = academicResultRepository.findByStudentRollNumber(rollNumber);

        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        factory.setNamespaceAware(true);
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document doc = builder.newDocument();

        Element response = doc.createElementNS(NAMESPACE_URI, "GetStudentResultResponse");

        Element elRoll = doc.createElementNS(NAMESPACE_URI, "rollNumber");
        elRoll.setTextContent(student.getRollNumber());
        response.appendChild(elRoll);

        Element elName = doc.createElementNS(NAMESPACE_URI, "studentName");
        elName.setTextContent(student.getFullName());
        response.appendChild(elName);

        Element elProg = doc.createElementNS(NAMESPACE_URI, "program");
        elProg.setTextContent(student.getDegree() + " in " + student.getDepartment());
        response.appendChild(elProg);

        Element elSem = doc.createElementNS(NAMESPACE_URI, "semester");
        elSem.setTextContent("Semester " + student.getSemester());
        response.appendChild(elSem);

        Element elSgpa = doc.createElementNS(NAMESPACE_URI, "sgpa");
        elSgpa.setTextContent("8.64");
        response.appendChild(elSgpa);

        Element elCgpa = doc.createElementNS(NAMESPACE_URI, "cgpa");
        elCgpa.setTextContent(String.valueOf(student.getCgpa() != null ? student.getCgpa() : 8.58));
        response.appendChild(elCgpa);

        Element elAtt = doc.createElementNS(NAMESPACE_URI, "overallAttendancePercentage");
        elAtt.setTextContent("76.96");
        response.appendChild(elAtt);

        Element elElig = doc.createElementNS(NAMESPACE_URI, "examEligibility");
        elElig.setTextContent("ELIGIBLE");
        response.appendChild(elElig);

        // Use DB results when available, otherwise fall back to sample data for demo
        if (!dbResults.isEmpty()) {
            for (AcademicResult ar : dbResults) {
                Element res = doc.createElementNS(NAMESPACE_URI, "results");

                Element code = doc.createElementNS(NAMESPACE_URI, "courseCode");
                code.setTextContent(ar.getCourse() != null ? ar.getCourse().getCourseCode() : "N/A");
                res.appendChild(code);

                Element name = doc.createElementNS(NAMESPACE_URI, "courseName");
                name.setTextContent(ar.getCourse() != null ? ar.getCourse().getCourseName() : "N/A");
                res.appendChild(name);

                Element marks = doc.createElementNS(NAMESPACE_URI, "internalMarks");
                marks.setTextContent(String.valueOf(ar.getTotalInternal() != null ? ar.getTotalInternal() : 0));
                res.appendChild(marks);

                Element max = doc.createElementNS(NAMESPACE_URI, "maxMarks");
                max.setTextContent(String.valueOf(ar.getMaxInternal() != null ? ar.getMaxInternal() : 40));
                res.appendChild(max);

                Element grade = doc.createElementNS(NAMESPACE_URI, "grade");
                grade.setTextContent(ar.getGrade() != null ? ar.getGrade() : "N/A");
                res.appendChild(grade);

                Element credits = doc.createElementNS(NAMESPACE_URI, "credits");
                credits.setTextContent(ar.getCourse() != null ? String.valueOf(ar.getCourse().getCredits()) : "0");
                res.appendChild(credits);

                response.appendChild(res);
            }
        } else {
            // Fallback sample data for demo / when DB is seeded but results table is empty
            String[][] sampleCourses = {
                    {"241CS017", "OOAD & UML", "36", "40", "A", "4"},
                    {"241AI021", "Machine Learning", "38", "40", "A+", "4"},
                    {"241AI023", "Deep Learning", "35", "40", "A", "3"},
                    {"241CS019", "API & Micro Services", "39", "40", "O", "3"}
            };

            for (String[] c : sampleCourses) {
                Element res = doc.createElementNS(NAMESPACE_URI, "results");

                Element code = doc.createElementNS(NAMESPACE_URI, "courseCode");
                code.setTextContent(c[0]);
                res.appendChild(code);

                Element name = doc.createElementNS(NAMESPACE_URI, "courseName");
                name.setTextContent(c[1]);
                res.appendChild(name);

                Element marks = doc.createElementNS(NAMESPACE_URI, "internalMarks");
                marks.setTextContent(c[2]);
                res.appendChild(marks);

                Element max = doc.createElementNS(NAMESPACE_URI, "maxMarks");
                max.setTextContent(c[3]);
                res.appendChild(max);

                Element grade = doc.createElementNS(NAMESPACE_URI, "grade");
                grade.setTextContent(c[4]);
                res.appendChild(grade);

                Element credits = doc.createElementNS(NAMESPACE_URI, "credits");
                credits.setTextContent(c[5]);
                res.appendChild(credits);

                response.appendChild(res);
            }
        }

        return response;
    }
}

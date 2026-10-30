# SSIS SOAP WEB SERVICE DOCUMENTATION

---

## 1. Web Service Architecture

The SSIS platform exposes an enterprise SOAP 1.1 / 1.2 Web Service adhering to standard W3C contract-first principles.

- **WSDL URL:** `http://localhost:8080/ws/student-result.wsdl`
- **Endpoint Location:** `http://localhost:8080/ws`
- **Target Namespace:** `http://aditya.ac.in/ssis/soap`
- **Service Name:** `StudentResultPortService`
- **Port Type:** `StudentResultPort`

---

## 2. Sample SOAP Request XML

Send an `HTTP POST` request to `http://localhost:8080/ws` with `Content-Type: text/xml`:

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:soap="http://aditya.ac.in/ssis/soap">
   <soapenv:Header/>
   <soapenv:Body>
      <soap:GetStudentResultRequest>
         <soap:rollNumber>24B11AI051</soap:rollNumber>
         <soap:semester>5</soap:semester>
      </soap:GetStudentResultRequest>
   </soapenv:Body>
</soapenv:Envelope>
```

---

## 3. Sample SOAP Response XML

```xml
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
   <SOAP-ENV:Header/>
   <SOAP-ENV:Body>
      <GetStudentResultResponse xmlns="http://aditya.ac.in/ssis/soap">
         <rollNumber>24B11AI051</rollNumber>
         <studentName>B. Rishi Vardhan</studentName>
         <program>B.Tech in Artificial Intelligence &amp; Machine Learning</program>
         <semester>Semester 5</semester>
         <sgpa>8.64</sgpa>
         <cgpa>8.58</cgpa>
         <overallAttendancePercentage>76.96</overallAttendancePercentage>
         <examEligibility>ELIGIBLE</examEligibility>
         <results>
            <courseCode>241CS017</courseCode>
            <courseName>OOAD &amp; UML</courseName>
            <internalMarks>36</internalMarks>
            <maxMarks>40</maxMarks>
            <grade>A</grade>
            <credits>4</credits>
         </results>
         <results>
            <courseCode>241AI021</courseCode>
            <courseName>Machine Learning</courseName>
            <internalMarks>38</internalMarks>
            <maxMarks>40</maxMarks>
            <grade>A+</grade>
            <credits>4</credits>
         </results>
         <results>
            <courseCode>241AI023</courseCode>
            <courseName>Deep Learning</courseName>
            <internalMarks>35</internalMarks>
            <maxMarks>40</maxMarks>
            <grade>A</grade>
            <credits>3</credits>
         </results>
         <results>
            <courseCode>241CS019</courseCode>
            <courseName>API &amp; Micro Services</courseName>
            <internalMarks>39</internalMarks>
            <maxMarks>40</maxMarks>
            <grade>O</grade>
            <credits>3</credits>
         </results>
      </GetStudentResultResponse>
   </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

---

## 4. Testing with cURL

```bash
curl -X POST http://localhost:8080/ws \
  -H "Content-Type: text/xml" \
  -d "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soap=\"http://aditya.ac.in/ssis/soap\"><soapenv:Body><soap:GetStudentResultRequest><soap:rollNumber>24B11AI051</soap:rollNumber></soap:GetStudentResultRequest></soapenv:Body></soapenv:Envelope>"
```

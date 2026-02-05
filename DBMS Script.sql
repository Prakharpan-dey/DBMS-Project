CREATE DATABASE course_portal;
USE course_portal;
CREATE TABLE ADMIN (
    Admin_ID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    STUDENT_Roll_No VARCHAR(100),
    INDEX idx_admin_email (Email)
);

-- Create STUDENT table
CREATE TABLE STUDENT (
    Roll_No VARCHAR(100) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(100) NOT NULL,
    Department VARCHAR(100),
    Semester INT,
    Status ENUM('active', 'inactive', 'graduated', 'suspended'),
    STUDENT_Roll_No VARCHAR(100),
    INDEX idx_student_email (Email),
    INDEX idx_student_department (Department),
    FOREIGN KEY (STUDENT_Roll_No) REFERENCES STUDENT(Roll_No)
);

-- Create COURSE table
CREATE TABLE COURSE (
    Course_ID VARCHAR(20) PRIMARY KEY,
    Course_Name VARCHAR(100) NOT NULL,
    Credits INT NOT NULL,
    Department VARCHAR(50),
    Semester INT,
    Status ENUM('active', 'inactive', 'archived'),
    INDEX idx_course_department (Department),
    INDEX idx_course_semester (Semester)
);

CREATE TABLE ADM_IN_ACCESS (
    ADMIN_Admin_ID INT,
    COURSE_Course_ID VARCHAR(20),
    PRIMARY KEY (ADMIN_Admin_ID, COURSE_Course_ID),
    FOREIGN KEY (ADMIN_Admin_ID) REFERENCES ADMIN(Admin_ID),
    FOREIGN KEY (COURSE_Course_ID) REFERENCES COURSE(Course_ID)
);


CREATE TABLE ENROLLMENT (
    STUDENT_Roll_No VARCHAR(100),
    COURSE_Course_ID VARCHAR(20),
    Enrollment_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Grade VARCHAR(2),
    PRIMARY KEY (STUDENT_Roll_No, COURSE_Course_ID),
    FOREIGN KEY (STUDENT_Roll_No) REFERENCES STUDENT(Roll_No),
    FOREIGN KEY (COURSE_Course_ID) REFERENCES COURSE(Course_ID)
);
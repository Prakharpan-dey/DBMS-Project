-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema course_allotment
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema course_allotment
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `course_allotment` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `course_allotment` ;

-- -----------------------------------------------------
-- Table `course_allotment`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `course_allotment`.`admin` (
  `Admin_ID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(100) NOT NULL,
  `Email` VARCHAR(100) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`Admin_ID`),
  UNIQUE INDEX `Email` (`Email` ASC) VISIBLE,
  INDEX `idx_admin_email` (`Email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `course_allotment`.`department`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `course_allotment`.`department` (
  `Department_ID` INT NOT NULL AUTO_INCREMENT,
  `Department_Name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`Department_ID`),
  UNIQUE INDEX `Department_Name` (`Department_Name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `course_allotment`.`course`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `course_allotment`.`course` (
  `Course_ID` VARCHAR(20) NOT NULL,
  `Course_Name` VARCHAR(100) NOT NULL,
  `Credits` INT NOT NULL,
  `Department_ID` INT NULL DEFAULT NULL,
  `Semester` INT NULL DEFAULT NULL,
  `Status` ENUM('active', 'inactive', 'archived') NOT NULL DEFAULT 'active',
  `Capacity` INT NOT NULL DEFAULT '0',
  `Slot` VARCHAR(50) NOT NULL DEFAULT 'TBA',
  `Faculty` VARCHAR(255) NOT NULL DEFAULT 'TBA',
  `Course_Type` ENUM('core', 'elective') NOT NULL DEFAULT 'core',
  `Elective_Slot` VARCHAR(50) NULL DEFAULT NULL,
  `Max_Choices` INT NULL DEFAULT NULL,
  PRIMARY KEY (`Course_ID`),
  INDEX `idx_course_department` (`Department_ID` ASC) VISIBLE,
  INDEX `idx_course_semester` (`Semester` ASC) VISIBLE,
  INDEX `idx_course_elective` (`Elective_Slot` ASC) VISIBLE,
  INDEX `idx_course_sem_dept` (`Semester` ASC, `Department_ID` ASC) VISIBLE,
  CONSTRAINT `course_ibfk_1`
    FOREIGN KEY (`Department_ID`)
    REFERENCES `course_allotment`.`department` (`Department_ID`)
    ON DELETE SET NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `course_allotment`.`adm_in_access`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `course_allotment`.`adm_in_access` (
  `ADMIN_Admin_ID` INT NOT NULL,
  `COURSE_Course_ID` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`ADMIN_Admin_ID`, `COURSE_Course_ID`),
  INDEX `COURSE_Course_ID` (`COURSE_Course_ID` ASC) VISIBLE,
  CONSTRAINT `adm_in_access_ibfk_1`
    FOREIGN KEY (`ADMIN_Admin_ID`)
    REFERENCES `course_allotment`.`admin` (`Admin_ID`)
    ON DELETE CASCADE,
  CONSTRAINT `adm_in_access_ibfk_2`
    FOREIGN KEY (`COURSE_Course_ID`)
    REFERENCES `course_allotment`.`course` (`Course_ID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `course_allotment`.`student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `course_allotment`.`student` (
  `Roll_No` VARCHAR(100) NOT NULL,
  `Name` VARCHAR(100) NOT NULL,
  `Email` VARCHAR(100) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `Department_ID` INT NULL DEFAULT NULL,
  `Semester` INT NOT NULL,
  `CGPA` DECIMAL(4,2) NULL DEFAULT NULL,
  `Status` ENUM('active', 'inactive', 'graduated', 'suspended') NOT NULL DEFAULT 'inactive',
  PRIMARY KEY (`Roll_No`),
  UNIQUE INDEX `Email` (`Email` ASC) VISIBLE,
  INDEX `idx_student_email` (`Email` ASC) VISIBLE,
  INDEX `idx_student_department` (`Department_ID` ASC) VISIBLE,
  CONSTRAINT `student_ibfk_1`
    FOREIGN KEY (`Department_ID`)
    REFERENCES `course_allotment`.`department` (`Department_ID`)
    ON DELETE SET NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `course_allotment`.`enrollment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `course_allotment`.`enrollment` (
  `STUDENT_Roll_No` VARCHAR(100) NOT NULL,
  `COURSE_Course_ID` VARCHAR(20) NOT NULL,
  `Enrollment_Date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `Grade` VARCHAR(2) NULL DEFAULT NULL,
  `Status` ENUM('allotted', 'waitlisted') NOT NULL DEFAULT 'allotted',
  PRIMARY KEY (`STUDENT_Roll_No`, `COURSE_Course_ID`),
  INDEX `COURSE_Course_ID` (`COURSE_Course_ID` ASC) VISIBLE,
  CONSTRAINT `enrollment_ibfk_1`
    FOREIGN KEY (`STUDENT_Roll_No`)
    REFERENCES `course_allotment`.`student` (`Roll_No`)
    ON DELETE CASCADE,
  CONSTRAINT `enrollment_ibfk_2`
    FOREIGN KEY (`COURSE_Course_ID`)
    REFERENCES `course_allotment`.`course` (`Course_ID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `course_allotment`.`preference`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `course_allotment`.`preference` (
  `STUDENT_Roll_No` VARCHAR(100) NOT NULL,
  `COURSE_Course_ID` VARCHAR(20) NOT NULL,
  `Rank` INT NOT NULL,
  PRIMARY KEY (`STUDENT_Roll_No`, `COURSE_Course_ID`),
  INDEX `COURSE_Course_ID` (`COURSE_Course_ID` ASC) VISIBLE,
  CONSTRAINT `preference_ibfk_1`
    FOREIGN KEY (`STUDENT_Roll_No`)
    REFERENCES `course_allotment`.`student` (`Roll_No`)
    ON DELETE CASCADE,
  CONSTRAINT `preference_ibfk_2`
    FOREIGN KEY (`COURSE_Course_ID`)
    REFERENCES `course_allotment`.`course` (`Course_ID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

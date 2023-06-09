-- Create Programs table
CREATE TABLE Programs (
  program_id SERIAL PRIMARY KEY,
  program_name VARCHAR(255) NOT NULL UNIQUE
);

-- Create Years table
CREATE TABLE Years (
  year_id SERIAL PRIMARY KEY,
  year_name VARCHAR(255) NOT NULL UNIQUE
);

-- Create DaysOfWeek table
CREATE TABLE DaysOfWeek (
  day_id SERIAL PRIMARY KEY,
  day_name VARCHAR(20) NOT NULL UNIQUE
);

-- Create Courses table
CREATE TABLE Courses (
  course_id SERIAL PRIMARY KEY,
  course_name VARCHAR(255) NOT NULL,
  course_code VARCHAR(255) NOT NULL,
  program_id INT NOT NULL,
  FOREIGN KEY (program_id) REFERENCES Programs (program_id)
);

-- Create ProgramYears table
CREATE TABLE ProgramYears (
  program_year_id SERIAL PRIMARY KEY,
  program_id INT NOT NULL,
  year_id INT NOT NULL,
  UNIQUE (program_id, year_id),
  FOREIGN KEY (program_id) REFERENCES Programs (program_id),
  FOREIGN KEY (year_id) REFERENCES Years (year_id)
);

-- Create Users table
CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(255) NOT NULL,
  notification_preference BOOLEAN NOT NULL,
  program_year_id INT,
  FOREIGN KEY (program_year_id) REFERENCES ProgramYears (program_year_id)
);

-- Create Lecturers table
CREATE TABLE Lecturers (
  lecturer_id SERIAL PRIMARY KEY,
  lecturer_name VARCHAR(255) NOT NULL,
  lecturer_email VARCHAR(255) NOT NULL UNIQUE
);

-- Create Rooms table
CREATE TABLE Rooms (
  room_id SERIAL PRIMARY KEY,
  room_name VARCHAR(255) NOT NULL,
  room_capacity INT NOT NULL,
  status VARCHAR(255) NOT NULL,
  UNIQUE (room_name)
);

-- Create Timetables table
CREATE TABLE Timetables (
  timetable_id SERIAL PRIMARY KEY,
  program_year_id INT NOT NULL,
  course_id INT NOT NULL,
  lecturer_id INT NOT NULL,
  room_id INT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  day_id INT NOT NULL,
  FOREIGN KEY (program_year_id) REFERENCES ProgramYears (program_year_id),
  FOREIGN KEY (course_id) REFERENCES Courses (course_id),
  FOREIGN KEY (lecturer_id) REFERENCES Lecturers (lecturer_id),
  FOREIGN KEY (room_id) REFERENCES Rooms (room_id),
  FOREIGN KEY (day_id) REFERENCES DaysOfWeek (day_id)
);

-- Create BookedClasses table
CREATE TABLE BookedClasses (
  booked_class_id SERIAL PRIMARY KEY,
  timetable_id INT NOT NULL,
  user_id INT NOT NULL,
  booking_time TIMESTAMPTZ NOT NULL,
  FOREIGN KEY (timetable_id) REFERENCES Timetables (timetable_id),
  FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

-- Create index on frequently queried columns
CREATE INDEX idx_timetables_program_year_id ON Timetables (program_year_id);
CREATE INDEX idx_timetables_course_id ON Timetables (course_id);
CREATE INDEX idx_timetables_lecturer_id ON Timetables (lecturer_id);
CREATE INDEX idx_timetables_room_id ON Timetables (room_id);
CREATE INDEX idx_timetables_day_id ON Timetables (day_id);

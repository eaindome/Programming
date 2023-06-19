-- Insert sample data into Programs table
INSERT INTO Programs (program_name) VALUES
  ('Computer Science'),
  ('Electrical Engineering'),
  ('Business Administration');

-- Insert sample data into Years table
INSERT INTO Years (year_name) VALUES
  ('Freshman'),
  ('Sophomore'),
  ('Junior'),
  ('Senior');

-- Insert sample data into DaysOfWeek table
INSERT INTO DaysOfWeek (day_name) VALUES
  ('Monday'),
  ('Tuesday'),
  ('Wednesday'),
  ('Thursday'),
  ('Friday');

-- Insert sample data into Courses table
INSERT INTO Courses (course_name, course_code, program_id) VALUES
  ('Introduction to Programming', 'CS101', 1),
  ('Data Structures', 'CS201', 1),
  ('Database Systems', 'CS301', 1),
  ('Introduction to Circuits', 'EE101', 2),
  ('Digital Systems Design', 'EE201', 2),
  ('Power Systems', 'EE301', 2),
  ('Introduction to Management', 'BA101', 3),
  ('Marketing Principles', 'BA201', 3),
  ('Financial Accounting', 'BA301', 3);

-- Insert sample data into ProgramYears table
INSERT INTO ProgramYears (program_id, year_id) VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (2, 1),
  (2, 2),
  (2, 3),
  (2, 4),
  (3, 1),
  (3, 2),
  (3, 3),
  (3, 4);

-- Insert sample data into Users table
INSERT INTO Users (username, password, email, role, notification_preference, program_year_id) VALUES
  ('student1', 'password1', 'student1@example.com', 'Student', true, 1),
  ('student2', 'password2', 'student2@example.com', 'Student', true, 2),
  ('student3', 'password3', 'student3@example.com', 'Student', true, 3),
  ('student4', 'password4', 'student4@example.com', 'Student', true, 4),
  ('classrep1', 'password5', 'classrep1@example.com', 'Class Rep', true, 5),
  ('classrep2', 'password6', 'classrep2@example.com', 'Class Rep', true, 6);

-- Insert sample data into Lecturers table
INSERT INTO Lecturers (lecturer_name, lecturer_email) VALUES
  ('Prof. Smith', 'smith@example.com'),
  ('Dr. Johnson', 'johnson@example.com'),
  ('Prof. Anderson', 'anderson@example.com');

-- Insert sample data into Rooms table
INSERT INTO Rooms (room_name, room_capacity, status) VALUES
  ('Room 101', 50, 'Empty'),
  ('Room 201', 40, 'Empty'),
  ('Room 301', 60, 'Empty');

-- Insert sample data into Timetables table
INSERT INTO Timetables (program_year_id, course_id, lecturer_id, room_id, start_time, end_time, day_id) VALUES
  (1, 1, 1, 1, '09:00:00', '10:30:00', 1),
  (1, 2, 1, 2, '11:00:00', '12:30:00', 2),
  (1, 3, 2, 3, '13:00:00', '14:30:00', 3),
  (2, 4, 2, 1, '09:00:00', '10:30:00', 4),
  (2, 5, 2, 2, '11:00:00', '12:30:00', 5),
  (2, 6, 3, 3, '13:00:00', '14:30:00', 1),
  (3, 7, 3, 1, '09:00:00', '10:30:00', 2),
  (3, 8, 1, 2, '11:00:00', '12:30:00', 3),
  (3, 9, 1, 3, '13:00:00', '14:30:00', 4);

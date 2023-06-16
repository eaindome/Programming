-- Insert sample data into Programs table
INSERT INTO Programs (program_name) VALUES
  ('Computer Science'),
  ('Electrical Engineering'),
  ('Mechanical Engineering');

-- Insert sample data into Years table
INSERT INTO Years (year_name) VALUES
  ('First Year'),
  ('Second Year'),
  ('Third Year'),
  ('Fourth Year');

-- Insert sample data into DaysOfWeek table
INSERT INTO DaysOfWeek (day_name) VALUES
  ('Monday'),
  ('Tuesday'),
  ('Wednesday'),
  ('Thursday'),
  ('Friday'),
  ('Saturday'),
  ('Sunday');

-- Insert sample data into Courses table
INSERT INTO Courses (course_name, course_code, program_id) VALUES
  ('Introduction to Programming', 'CS101', 1),
  ('Database Management', 'CS201', 1),
  ('Circuit Analysis', 'EE101', 2),
  ('Control Systems', 'EE301', 2),
  ('Mechanics', 'ME101', 3),
  ('Thermodynamics', 'ME201', 3);

-- Insert sample data into ProgramYears table
INSERT INTO ProgramYears (program_id, year_id) VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (2, 1),
  (2, 2),
  (3, 1),
  (3, 2);

-- Insert sample data into Users table
INSERT INTO Users (username, password, email, role, notification_preference, program_year_id) VALUES
  ('john.doe', 'password123', 'john.doe@example.com', 'Student', true, 1),
  ('jane.smith', 'password456', 'jane.smith@example.com', 'Student', true, 2),
  ('admin', 'admin123', 'admin@example.com', 'Admin', true, NULL);

-- Insert sample data into Lecturers table
INSERT INTO Lecturers (lecturer_name, lecturer_email) VALUES
  ('Dr. Robert Johnson', 'robert.johnson@example.com'),
  ('Prof. Sarah Adams', 'sarah.adams@example.com');

-- Insert sample data into Rooms table
INSERT INTO Rooms (room_name, room_capacity, status) VALUES
  ('Room A', 50, 'Empty'),
  ('Room B', 30, 'Empty'),
  ('Room C', 40, 'Ongoing');

-- Insert sample data into Timetables table
INSERT INTO Timetables (program_year_id, course_id, lecturer_id, room_id, start_time, end_time, day_id) VALUES
  (1, 1, 1, 1, '09:00:00', '11:00:00', 1),
  (2, 2, 2, 2, '13:00:00', '15:00:00', 2);

-- Insert sample data into BookedClasses table
INSERT INTO BookedClasses (timetable_id, user_id, booking_time) VALUES
  (1, 1, NOW()),
  (2, 2, NOW());

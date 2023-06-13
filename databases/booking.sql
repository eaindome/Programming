CREATE TABLE Booking (
  BookingID SERIAL PRIMARY KEY,
  UserID INT REFERENCES User(UserID),
  TimetableID INT REFERENCES Timetable(TimetableID),
  BookingTime TIMESTAMP NOT NULL
);
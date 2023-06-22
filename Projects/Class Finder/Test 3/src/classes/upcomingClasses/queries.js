// Query: Get upcoming Classes for the day
const upcomingClasses = `
                        SELECT c.course_name, t.start_time, t.end_time, r.room_name, d.day_name
                        FROM timetables t
                        INNER JOIN courses c ON t.course_id = c.course_id
                        INNER JOIN rooms r ON t.room_id = r.room_id
                        INNER JOIN daysofweek d ON t.day_id = d.day_id
                        WHERE t.program_year_id = (
                            SELECT program_year_id FROM Users WHERE user_id = $1
                        )
                        AND (
                            (d.day_id = EXTRACT(DOW FROM CURRENT_DATE) AND t.start_time > CURRENT_TIME)      -- Adding 1 to match day_id values
                            OR d.day_id > EXTRACT(DOW FROM CURRENT_DATE)
                        )
                        ORDER BY d.day_id ASC, t.start_time ASC
                        LIMIT 1;
`;


module.exports = {
    upcomingClasses,
};
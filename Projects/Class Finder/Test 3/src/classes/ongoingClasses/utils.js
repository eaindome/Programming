// Get the current day (e.g., 'Monday', 'Tuesday', etc.)
const getCurrentDay = () => {
    const currentDate = new Date();
    const currentDayIndex = currentDate.getUTCDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[currentDayIndex];
};
  
  // Get the current time in 'HH:MM' format
const getCurrentTime = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getUTCHours().toString().padStart(2, '0');
    const currentMinute = currentDate.getUTCMinutes().toString().padStart(2, '0');
    return `${currentHour}:${currentMinute}`;
};
  
module.exports = {
    getCurrentDay,
    getCurrentTime,
};

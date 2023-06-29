// Get the current day
const getCurrentDay = () => {
    const currentDate = new Date();
    currentDate.setUTCHours(currentDate.getUTCHours() - 12);
    const options = { weekday: 'long', timeZone: 'Etc/GMT' };
    return currentDate.toLocaleDateString('en-US', options);
};
  
// Get the current time in 'HH:MM' format
const getCurrentTime = () => {
    const currentDate = new Date();
    currentDate.setUTCHours(currentDate.getUTCHours() - 12);
    const options = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Etc/GMT' };
    return currentDate.toLocaleString('en-US', options);
};
  
console.log(getCurrentDay());
console.log(getCurrentTime());

module.exports = {
  getCurrentDay,
  getCurrentTime,
};
  


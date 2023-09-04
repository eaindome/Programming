'''
Create a Time class and initialize it with hours and minutes.
1. Make a method addTime which should take two time object and add them. 
    E.g.- (2 hour and 50 min)+(1 hr and 20 min) is (4 hr and 10 min)
2. Make a method displayTime which should print the time.
3. Make a method DisplayMinute which should display the total minutes in the Time. E.g.- (1 hr 2 min) should display 62 minute.
'''

class Time:
    def __init__(self, hours, minutes):
        self.hours = hours
        self.min = minutes

    def addTime(self, other_time):
        total_hours = self.hours + other_time.hours
        total_minutes = self.min + other_time.min

        if total_minutes >= 60:
            total_hours += total_minutes // 60
            total_minutes %= 60

        return Time(total_hours, total_minutes)

    def displayTime(self):
        return f"Time: {self.hours}:{self.min}"

    def DisplayMinute(self):
        hour_minutes = self.hours * 60
        return f"Total minutes: {hour_minutes + self.min}"
            
# Example usage
time1 = Time(2, 50)
time2 = Time(1, 20)

# Add two Time objecs
result_time = time1.addTime(time2)
print("Resultant Time:\n"
      f"{result_time.displayTime()}\n"
      f"{result_time.DisplayMinute()}")


'''
Solution:

  def __init__(self, hours, mins):
    self.hours = hours
    self.mins = mins

  def addTime(t1, t2):
    t3 = Time(0,0)
    if t1.mins+t2.mins > 60:
      t3.hours = (t1.mins+t2.mins)/60
    t3.hours = t3.hours+t1.hours+t2.hours
    t3.mins = (t1.mins+t2.mins)-(((t1.mins+t2.mins)/60)*60)
    return t3

  def displayTime(self):
    print "Time is",self.hours,"hours and",self.mins,"minutes."

  def displayMinute(self):
    print (self.hours*60)+self.mins

a = Time(2,50)
b = Time(1,20)
c = Time.addTime(a,b)
c.displayTime()
c.displayMinute()
'''
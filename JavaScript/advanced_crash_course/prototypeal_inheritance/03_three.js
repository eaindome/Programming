/**
 * Scenario 3: Create a Person constructor and a Teacher 
 * constructor that inherits from Person. Add a method to 
 * Teacher that logs the subject they teach.
 */

function Person(name, school) {
    this.name = name;
    this.school = school;
}

function Teacher(name, school, subject) {
    Person.call(this, name, school);
    this.subject = subject;
}

Teacher.prototype = Object.create(Person.prototype);

Teacher.prototype.constructor = Teacher;

Teacher.prototype.subjectTaught = function() {
    return `${this.name} teaches the subject ${this.subject} in ${this.school}.`
}

const teach1 = new Teacher('Mr. Johnson', 'Mfantsipim School', 'English Language');
console.log(teach1.subjectTaught());

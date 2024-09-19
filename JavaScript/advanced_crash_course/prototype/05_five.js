/**
 * Scenario 5: Create a Book constructor function, then use prototypes to add a 
 * method that returns the book's title and author.
 */

function Book(title, author) {
    this.title = title;
    this.author = author;
}

Book.prototype.getInformation = function() {
    return `Book information\nTitle: ${this.title}\nAuthor: ${this.author}\n`;
}

// creating instances of Book
const book1 = new Book('To Kill a Mockingbird', 'Harper Lee');
const book2 = new Book('1984', 'George Orwell');

// calling the prototype method to get the book's information
console.log(book1.getInformation());
console.log(book2.getInformation());
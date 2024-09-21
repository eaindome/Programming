/**
 * Create a Library class with a static method that 
 * returns the total number of books in all instances of 
 * Library.
 */

class Library {
    static totalBooksInAllLibraries = 0;

    constructor(name, numBooks) {
        this.name = name;
        this.numBooks = numBooks;

        Library.totalBooksInAllLibraries += numBooks;
    }

    static getTotalBooks() {
        return `The total number of books: ${Library.totalBooksInAllLibraries}`;
    }
}

const lib1 = new Library('Central Library', 1000);
const lib2 = new Library('Community Library', 500);

console.log(Library.getTotalBooks());

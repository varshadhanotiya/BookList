// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
    }
  }
  
  // UI Class: Handle UI Tasks
  class UI {
    // static displayBooks() {
    //   const StoredBooks = [
    //     {
    //         title: 'Book One',
    //         author: 'John Doe',
    //         isbn: '323232'
    //     },
    //     {
    //         title: 'Book Two',
    //         author: 'Jone Doe',
    //         isbn: '121212'
    //     }
    //   ];

    //   const books = StoredBooks;
  
    //   books.forEach((book) => UI.addBookToList(book));
    // }
  
    static addBookToList(book) {
      const list = document.querySelector('#book-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
  
      list.appendChild(row);
    }

    static clearFields(){
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#isbn').value = '';
    }
  }
  
  // Store Class: Handles Storage
  
  // Event: Display Books
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  
  // Event: Add a Book

  document.querySelector('#book-form').addEventListener('submit' , (e)=>{
      //prevent actual submit
      e.preventDefault();

      //get form values
      const title = document.querySelector('#title').value;
      const author = document.querySelector('#author').value;
      const isbn = document.querySelector('#isbn').value;

      //instantiate book
      const book = new Book(title,author,isbn);

      //add book to UI
      UI.addBookToList(book);

      //clear field
      UI.clearFields();
  });
  
  // Event: Remove a Book
  
    // Remove book from store
  
    // Show success message

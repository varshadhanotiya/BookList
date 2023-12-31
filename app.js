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
    static displayBooks() {
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

      // const books = StoredBooks;

      const books = Store.getBooks();
  
      books.forEach((book) => UI.addBookToList(book));
    }
  
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

    static deleteBook(el){
      if(el.classList.contains('delete')){
        //parent of 'x' is <td> and parent of <td>is tr so delete the whole row <tr>
        el.parentElement.parentElement.remove();
      }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form); //inser before the form and container is parent

        //Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove() , 3000);
    }

    static clearFields(){
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#isbn').value = '';
    }
  }
  
  // Store Class: Handles Storage
  class Store{
    static getBooks(){
      let books;
      //if no books found then set books to an empty array
      if(localStorage.getItem('books') === null){
        books = [];
      }else{
        // to use it as javaScript array of objects
        books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
    }

    static addBook(book){
      const books = Store.getBooks();
      books.push(book);

      //JSON.stringify = this way you can actually get an array otherwise it is array of object
      localStorage.setItem('books' , JSON.stringify(books));
    }

    static removeBook(isbn){
      const books = Store.getBooks();

      books.forEach((book,index) => {
        if(book.isbn === isbn){
          books.splice(index,1);
        }
      });

      //reset localstorage to that book removed 
      localStorage.setItem('books' , JSON.stringify(books));
    }
  }
  
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

      //Validate
      if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill in all fields','danger');
      }else{
      //instantiate book
      const book = new Book(title,author,isbn);

      //add book to UI
      UI.addBookToList(book);

      //add book to store
      Store.addBook(book);

      //show success message
      UI.showAlert('Book Added' , 'success');

      //clear field
      UI.clearFields();
      }
  });

  
  // Event: Remove a Book
  document.querySelector('#book-list').addEventListener('click',(e) => {
    UI.deleteBook(e.target);

    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
    //show book removed message
    UI.showAlert('Book Removed' , 'success');
  });  
const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeModal = document.querySelector('.close');
const title = document.querySelector('#book-title');
const author = document.querySelector('#book-author');
const pages = document.querySelector('#book-pages');
const read = document.querySelector('#book-read');
const submitBtn = document.querySelector('.submit-btn');

modalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  modal.style.display = "none";
});

window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

submitBtn.addEventListener('click', e => {
  e.preventDefault();

  const bookTitle = title.value;
  const bookAuthor = author.value;
  const bookPages = Number(pages.value);
  let bookRead;

  checkBookInput(bookTitle, bookAuthor, bookPages);

  if (read.checked) {
    bookRead = 'Read'
  } else {
    bookRead = 'Not Read'
  }

  const book = new Book(bookTitle, bookAuthor, bookPages, bookRead);
  addBookToLibrary(book);

  modal.style.display = "none";
});


let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(myLibrary);
}

function checkBookInput(title, author, pages) {
  if (title === '' || author === '' || pages === '') {
    alert('Please, fill in all the fields');
    modal.style.display = "none";
  }
}
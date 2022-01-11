const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeModal = document.querySelector('.close');
const title = document.querySelector('#book-title');
const author = document.querySelector('#book-author');
const pages = document.querySelector('#book-pages');
const read = document.querySelector('#book-read');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.container');

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
  clearInput();
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
  displayBook(myLibrary);
}

function checkBookInput(title, author, pages) {
  if (title === '' || author === '' || pages === '') {
    alert('Please, fill in all the fields');
    modal.style.display = "none";
  }
}

function displayBook(myLibrary) {
  for (let i = 0; i < myLibrary.length; i++) {
    const card = createCard();
    const cardHeader = createCardHeader();
    const titleOfBook = document.createTextNode(myLibrary[i].title);
    cardHeader.append(titleOfBook);
    card.appendChild(cardHeader);
    container.appendChild(card);
  }
}

function createCard() {
  const card = document.createElement('div');
  card.classList.add('card');
  return card;
}

function createCardHeader() {
  const cardHeader = document.createElement('h3');
  return cardHeader;
}

function createCardBody() {
  const cardBody = document.createElement('div');
}

function createCardText() {
  const para = document.createElement('p');
  const para2 = document.createElement('p');

  return [para, para2];
}

function clearInput() {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
}
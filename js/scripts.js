const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.close');
const title = document.querySelector('#book-title');
const author = document.querySelector('#book-author');
const pages = document.querySelector('#book-pages');
const read = document.querySelector('#book-read');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.container');
let myLibrary = [];

modalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', closeModal);

function closeModal() {
  modal.style.display = "none";
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

submitBtn.addEventListener('click', e => {
  e.preventDefault();

  const bookTitle = title.value;
  const bookAuthor = author.value;
  const bookPages = Number(pages.value);
  let bookRead;

  if (checkBookInput(bookTitle, bookAuthor, bookPages)) {
    return;
  }

  if (read.checked) {
    bookRead = 'Read'
  } else {
    bookRead = 'Not Read'
  }

  const book = new Book(bookTitle, bookAuthor, bookPages, bookRead);
  addBookToLibrary(book);

  closeModal()
  clearInput();
});

function checkBookInput(title, author, pages) {
  if (title === '' || author === '' || pages === '') {
    alert('Please, fill in all the fields');
    closeModal();
    return true;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBook(book);
}

function displayBook(book) {
  const card = createCard();
  const cardBody = createCardBody();
  const cardHeader = createCardHeader();
  const paras = createCardText();
  const readBtn = createReadButton();
  const deleteBtn = createDeleteButton();

  const titleOfBook = document.createTextNode(book.title);
  const authorOfBook = document.createTextNode(book.author);
  const pagesOfBook = document.createTextNode(book.pages + 'pg');
  const bookRead = document.createTextNode(book.read);

  changeReadBtnColor(readBtn, bookRead);

  readBtn.appendChild(bookRead);
  paras[0].appendChild(authorOfBook);
  paras[1].appendChild(pagesOfBook);
  cardHeader.appendChild(titleOfBook);
  cardBody.append(cardHeader, paras[0], paras[1], readBtn, deleteBtn);
  card.appendChild(cardBody);
  container.appendChild(card);

  readBtn.addEventListener('click', changeReadStatus);
  deleteBtn.addEventListener('click', deleteBook);
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
  cardBody.classList.add('card__body');
  return cardBody
}

function createCardText() {
  const para = document.createElement('p');
  const para2 = document.createElement('p');
  return [para, para2];
}

function createReadButton() {
  const button = document.createElement('button');
  button.classList.add('card__button')
  return button;
}

function createDeleteButton() {
  const button = document.createElement('button');
  button.classList.add('card__button', 'card__button--delete');
  const deleteBtnText = document.createTextNode('Remove');
  button.append(deleteBtnText);
  return button;
}

function changeReadBtnColor(readBtn, bookRead) {
  if (bookRead.textContent === 'Read') {
    readBtn.classList.add('card__button--green');
  } else  {
    readBtn.classList.add('card__button--red');
  }
}

function deleteBook(e) {
  const parent = e.target.parentElement;
  const bookTitle = parent.firstElementChild.textContent;

  for (let i = 0; i < myLibrary.length; i++) {
    if (bookTitle === myLibrary[i].title) {
      myLibrary.splice(i, 1);
      e.target.parentElement.parentElement.remove();
    }
  }
}

function changeReadStatus(e) {
  if (e.target.textContent === 'Read') {
    e.target.textContent = 'Not Read';
    e.target.classList.remove('card__button--green');
    changeReadBtnColor(e.target, e.target);
  } else if (e.target.textContent === 'Not Read'){
    e.target.textContent = 'Read';
    e.target.classList.remove('card__button--red');
    changeReadBtnColor(e.target, e.target);
  }
}

function clearInput() {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
}

window.addEventListener('click', e => {
  if (e.target === modal) {
    closeModal();
  }
});
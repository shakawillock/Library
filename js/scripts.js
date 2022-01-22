const modal = document.querySelector('#my-modal');
const container = document.querySelector('.container');
let myLibrary = JSON.parse(localStorage.getItem('books')) || [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const button = (() => {
  const modalBtn = document.querySelector('#modal-btn');
  const closeBtn = document.querySelector('.close');
  const submitBtn = document.querySelector('.submit-btn');

  return {
    modalBtn,
    closeBtn,
    submitBtn
  }
})();

const inputField = (() => {
  const title = document.querySelector('#book-title');
  const author = document.querySelector('#book-author');
  const pages = document.querySelector('#book-pages');
  const read = document.querySelector('#book-read');

  function clear() {
    inputField.title.value = '';
    inputField.author.value = '';
    inputField.pages.value = '';
    inputField.read.checked = false;
  }

  return {
    title,
    author,
    pages,
    read,
    clear
  }
})();

button.modalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

button.closeBtn.addEventListener('click', closeModal);

function closeModal() {
  modal.style.display = 'none';
}

button.submitBtn.addEventListener('click', e => {
  e.preventDefault();

  const bookTitle = inputField.title.value;
  const bookAuthor = inputField.author.value;
  const bookPages = Number(inputField.pages.value);
  let bookRead;

  if (checkBookInput(bookTitle, bookAuthor, bookPages)) {
    return;
  }

  if (inputField.read.checked) {
    bookRead = 'Read'
  } else {
    bookRead = 'Not Read'
  }

  const book = new Book(bookTitle, bookAuthor, bookPages, bookRead);
  addBookToLibrary(book);

  closeModal()
  inputField.clear();
});

function checkBookInput(title, author, pages) {
  if (title === '' || author === '' || pages === 0) {
    alert('Please, fill in all the fields');
    closeModal();
    return true;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBook(book);
  addToLocalStorage();
}

function displayBook(book) {
  const card = Card.createCard();
  const cardBody = Card.createCardBody();
  const cardTitle = Card.createCardTitle();
  const paras = Card.createCardText();
  const readBtn = Card.createReadButton();
  const deleteBtn = Card.createDeleteButton();

  const titleOfBook = document.createTextNode(book.title);
  const authorOfBook = document.createTextNode(book.author);
  const pagesOfBook = document.createTextNode(book.pages + 'pg');
  const bookRead = document.createTextNode(book.read);

  Card.changeReadBtnColor(readBtn, bookRead);

  readBtn.appendChild(bookRead);
  paras[0].appendChild(authorOfBook);
  paras[1].appendChild(pagesOfBook);
  cardTitle.appendChild(titleOfBook);
  cardBody.append(cardTitle, paras[0], paras[1], readBtn, deleteBtn);
  card.appendChild(cardBody);
  container.appendChild(card);

  readBtn.addEventListener('click', Card.changeReadStatus);
  deleteBtn.addEventListener('click', Card.deleteCard);
}

const Card = (() => {
  function createCard() {
    const card = document.createElement('div');
    card.classList.add('card');
    return card;
  }
  
  function createCardTitle() {
    const cardTitle = document.createElement('h3');
    return cardTitle;
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
  
  function changeReadStatus(e) {
    if (e.target.textContent === 'Read') {
      e.target.textContent = 'Not Read';
      e.target.classList.remove('card__button--green');
      changeReadBtnColor(e.target, e.target);
    } else {
      e.target.textContent = 'Read';
      e.target.classList.remove('card__button--red');
      changeReadBtnColor(e.target, e.target);
    }
  
    updateLocalStorage(e);
  }
  
  function deleteCard(e) {
    const cardBody = e.target.parentElement;
    const card = cardBody.parentElement;
    const bookTitle = cardBody.firstElementChild.textContent;
  
    for (let i = 0; i < myLibrary.length; i++) {
      if (bookTitle === myLibrary[i].title) {
        myLibrary.splice(i, 1);
        card.remove();
        removeLocalStorage(i);
      }
    }
  }

  return {
    createCard,
    createCardTitle,
    createCardBody,
    createCardText,
    createReadButton,
    createDeleteButton,
    changeReadBtnColor,
    changeReadStatus,
    deleteCard,
  }
})();

window.addEventListener('click', e => {
  if (e.target === modal) {
    closeModal();
  }
});

function addToLocalStorage() {
  localStorage.setItem('books', JSON.stringify(myLibrary));
}

function removeLocalStorage(index) {
  let library = JSON.parse(localStorage.getItem('books')) || [];
  
  for (let i = 0; i < library.length; i++) {
    library.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(library));
  }
}

function updateLocalStorage(e) {
  const cardBody = e.target.parentElement;
  const bookTitle = cardBody.firstElementChild.textContent;
  let library = JSON.parse(localStorage.getItem('books')) || [];

  for (let i = 0; i < library.length; i++) {
    if (bookTitle === library[i].title ) {
    library[i].read = e.target.textContent;
    localStorage.setItem('books', JSON.stringify(library));
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < myLibrary.length; i++) {
    displayBook(myLibrary[i]);
  }  
});
const modal = document.querySelector('#my-modal');
let myLibrary = JSON.parse(localStorage.getItem('books')) || [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const Button = (() => {
  const modalBtn = document.querySelector('#modal-btn');
  const closeBtn = document.querySelector('.close');
  const submitBtn = document.querySelector('.submit-btn');

  return {
    modalBtn,
    closeBtn,
    submitBtn
  }
})();

const InputField = (() => {
  const title = document.querySelector('#book-title');
  const author = document.querySelector('#book-author');
  const pages = document.querySelector('#book-pages');
  const read = document.querySelector('#book-read');

  function clear() {
    InputField.title.value = '';
    InputField.author.value = '';
    InputField.pages.value = '';
    InputField.read.checked = false;
  }

  return {
    title,
    author,
    pages,
    read,
    clear
  }
})();

Button.modalBtn.addEventListener('click', openModal);
Button.closeBtn.addEventListener('click', closeModal);
Button.submitBtn.addEventListener('click', addBook);

function addBook(e) {
  e.preventDefault();

  const bookTitle = InputField.title.value;
  const bookAuthor = InputField.author.value;
  const bookPages = Number(InputField.pages.value);
  let bookRead;

  if (BookModule.checkInput(bookTitle, bookAuthor, bookPages)) {
    return;
  }

  if (InputField.read.checked) {
    bookRead = 'Read'
  } else {
    bookRead = 'Not Read'
  }

  const book = new Book(bookTitle, bookAuthor, bookPages, bookRead);
  BookModule.addToLibrary(book);

  closeModal()
  InputField.clear();
}

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

const BookModule = (() => {
  function checkInput(title, author, pages) {
    if (title === '' || author === '' || pages === 0) {
      alert('Please, fill in all the fields');
      closeModal();
      return true;
    }
  }

  function addToLibrary(book) {
    myLibrary.push(book);
    Card.setValues(book);
    addToLocalStorage();
  }

  function display(card) {
    const container = document.querySelector('.container');
    container.appendChild(card)
  }

  return {
    checkInput,
    addToLibrary,
    display
  }
})();

const Card = (() => {
  function create() {
    const card = document.createElement('div');
    card.classList.add('card');
    return card;
  }
  
  function createTitle() {
    const cardTitle = document.createElement('h3');
    return cardTitle;
  }
  
  function createBody() {
    const cardBody = document.createElement('div');
    cardBody.classList.add('card__body');
    return cardBody
  }
  
  function createText() {
    const para = document.createElement('p');
    const para2 = document.createElement('p');
    return [para, para2];
  }
  
  function createReadBtn() {
    const button = document.createElement('button');
    button.classList.add('card__button')
    return button;
  }
  
  function createDeleteBtn() {
    const button = document.createElement('button');
    button.classList.add('card__button', 'card__button--delete');
    const deleteBtnText = document.createTextNode('Remove');
    button.append(deleteBtnText);
    return button;
  }

  function setValues(book) {
    const card = Card.create();
    const cardBody = Card.createBody();
    const cardTitle = Card.createTitle();
    const paras = Card.createText();
    const readBtn = Card.createReadBtn();
    const deleteBtn = Card.createDeleteBtn();
  
    const {title, author, pages, read} = book;

    const titleOfBook = document.createTextNode(title);
    const authorOfBook = document.createTextNode(author);
    const pagesOfBook = document.createTextNode(pages + 'pg');
    const bookRead = document.createTextNode(read);
  
    Card.changeReadBtnColor(readBtn, bookRead);
  
    readBtn.appendChild(bookRead);
    paras[0].appendChild(authorOfBook);
    paras[1].appendChild(pagesOfBook);
    cardTitle.appendChild(titleOfBook);
    cardBody.append(cardTitle, paras[0], paras[1], readBtn, deleteBtn);
    card.appendChild(cardBody);

    readBtn.addEventListener('click', Card.changeReadStatus);
    deleteBtn.addEventListener('click', Card.remove);
    BookModule.display(card)
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
  
  function remove(e) {
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
    create,
    createTitle,
    createBody,
    createText,
    createReadBtn,
    createDeleteBtn,
    setValues,
    changeReadBtnColor,
    changeReadStatus,
    remove,
  }
})();

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
    Card.setValues(myLibrary[i]);
  }  
});

window.addEventListener('click', e => {
  if (e.target === modal) {
    closeModal();
  }
});
const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeModal = document.querySelector('.close');

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

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {

}
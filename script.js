const library = [];
const container = document.querySelector('.container');
const addBookButton = document.querySelector('button');

addBookButton.addEventListener('click', () => {
    addBookToLibrary();
});

function Book (title, author, pageCount, readStatus) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.readStatus = true;
}

Book.prototype.toggleRead = function (e) {
    this.readStatus = !this.readStatus;
    this.readStatus ? e.target.innerText = 'Read' : e.target.innerText = 'Unread';
};

function addBookToLibrary() {
    let title = prompt('title');
    let author = prompt('author');
    let pageCount = prompt('pageCount');
    let readStatus = prompt('read');
    let newBook = new Book(title, author, pageCount, readStatus);
    library.push(newBook);
    addBookToWebpage(library);
}

function addBookToWebpage(library) {
    let lastChild = container.lastElementChild;
    for (let i = library.length-1; i <= library.length-1; i++) {
        let newBook = document.querySelector('.container').appendChild(
            elt('div',
                elt('h2', `${library[i].title}`),
                elt('p', `${library[i].author}`),
                elt('p', `${library[i].pageCount}`),
                elt('button'),
                elt('button', 'Delete me')));
        newBook.classList.add('book');
        newBook.setAttribute('data-id', `${i}`);
        library[i].readStatus ? newBook.lastChild.previousElementSibling.innerText = 'Read' : newBook.lastChild.previousElementSibling.innerText = 'Unread';
        newBook.lastChild.previousElementSibling.addEventListener('click', (e) => {
            library[i].toggleRead(e);
        })
        newBook.lastChild.addEventListener('click', (e) => {
            deleteBook(e);
        })
        container.insertBefore(newBook, lastChild);
    }
}

function deleteBook (e) {
    let bookNodeIndex = e.target.parentElement.getAttribute('data-id');
    let bookNodeToDelete = container.querySelectorAll('.book')[bookNodeIndex];
    for(let book in library) {
        if (book === bookNodeIndex) {
            container.removeChild(bookNodeToDelete);
        }
    }
    library.splice(bookNodeIndex, 1);
    for (let i = bookNodeIndex; i < container.querySelectorAll('.book').length; i++) {
        container.children[i].setAttribute('data-id', `${i}`);
    }
}

function elt(type, ...children) {
  let node = document.createElement(type);
  for (let child of children) {
    if (typeof child != 'string') node.appendChild(child);
    else node.appendChild(document.createTextNode(child));
  }
  return node;
}
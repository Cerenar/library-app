const library = [];
const container = document.querySelector('.container');
const addBookButton = document.querySelector('button');

addBookButton.addEventListener('click', () => {
    addBookToLibrary();
});

// deleteBookButton.addEventListener('click', () => {
//     deleteBook();
// });

function Book (title, author, pageCount, readStatus) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.readStatus = readStatus;
}

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
                elt('p', `${library[i].readStatus}`),
                elt('button', 'Delete me')));
        newBook.classList.add('book');
        newBook.setAttribute('data-id', `${i}`);
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
}

function elt(type, ...children) {
  let node = document.createElement(type);
  for (let child of children) {
    if (typeof child != 'string') node.appendChild(child);
    else node.appendChild(document.createTextNode(child));
  }
  return node;
}

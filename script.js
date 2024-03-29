let book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'Have read');
let book2 = new Book('c', 'd', 2, 'no');

const library = [book1, book2];
const container = document.querySelector('.container');

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
}

function addBookToWebpage(library) {
    for (let i = library.length-1; i >= 0; i--) {
        let newBook = document.querySelector(".container").appendChild(
            elt("div",
                elt("h2", `${library[i].title}`),
                elt("p", `${library[i].author}`),
                elt("p", `${library[i].pageCount}`),
                elt("p", `${library[i].readStatus}`)));
        newBook.classList.add('book');
        container.append(newBook);
        library.pop(library[i]);
    }
}

addBookToWebpage(library);


function elt(type, ...children) {
  let node = document.createElement(type);
  for (let child of children) {
    if (typeof child != "string") node.appendChild(child);
    else node.appendChild(document.createTextNode(child));
  }
  return node;
}

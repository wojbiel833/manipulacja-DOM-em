'use-strict';

const select = {
  templateOf: {
    book: '#template-book',
  },
  bookInfo: {
    list: '.books-list',
    cover: '.book__image',
  },
  filters: {
    section: '.filters',
  },
};

const templates = {
  bookTemp: Handlebars.compile(
    document.querySelector(select.templateOf.book).innerHTML
  ),
};

const books = {};
const filters = [];
const filterSec = document.querySelector(select.filters.section);

books.covers = document.querySelectorAll(select.bookInfo.cover);
console.log(books.covers);
books.list = document.querySelector(select.bookInfo.list);
console.log(books.list);

function renderHTML() {
  const thisBook = this;

  for (const item of dataSource.books) {
    // console.log(item);

    const generateHTML = templates.bookTemp(item);
    // console.log(generateHTML);
    thisBook.element = utils.createDOMFromHTML(generateHTML);

    const listElem = document.querySelector(select.bookInfo.list);
    // console.log(listElem);
    listElem.appendChild(thisBook.element);
  }
}

let coverID;

function initActions() {
  const thisBook = this;
  const favouriteBooks = [];
  console.log(favouriteBooks);

  books.list.addEventListener('dblclick', function () {
    if (event.target.offsetParent.classList.contains('book__image')) {
      event.preventDefault();
      console.log(event.target);
      console.log(event.target.parentNode.parentNode);
      // for (const cover of thisBook.covers) {
      // console.log(cover);
      coverID = event.target.parentNode.parentNode.getAttribute('data-id');
      console.log(coverID);
      if (!favouriteBooks.includes(coverID)) {
        event.target.parentNode.parentNode.classList.add('favorite');
        favouriteBooks.push(coverID);
        console.log(favouriteBooks);
      } else {
        event.target.parentNode.parentNode.classList.remove('favorite');
        favouriteBooks.splice(thisBook.coverID, 1);
        console.log(favouriteBooks);
      }
      // }
    }
    console.log(favouriteBooks);
  });

  filterSec.addEventListener('click', function () {
    console.log('click');
    if (event.target.value == 'adults') {
      console.log(event.target.value);
      if (event.target.checked) {
        console.log('checked');
        filters.push(event.target.value);
        console.log(filters);
        booksFilter();
      } else {
        filters.splice(event.target.value, 1);
        console.log(filters);
        booksFilter();
      }
    }
    if (event.target.value == 'nonFiction') {
      console.log(event.target.value);
      if (event.target.checked) {
        console.log('checked');
        filters.push(event.target.value);
        console.log(filters);
        booksFilter();
      } else {
        filters.splice(event.target.value, 1);
        console.log(filters);
        booksFilter();
      }
    }
  });
}

function booksFilter() {
  const thisBook = this;

  for (const filteredBooks of dataSource.books) {
    console.log(filteredBooks);
    let shouldBeHidden = false;
    if (filteredBooks.details.hasOwnProperty('adults')) {
      for (const filter of filters) {
        if (!filteredBooks.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
    }
  }
}

renderHTML();
initActions();

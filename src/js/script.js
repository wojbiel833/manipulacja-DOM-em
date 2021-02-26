'use-strict';

const select = {
  templateOf: {
    book: '#template-book',
  },
  bookInfo: {
    list: '.books-list',
    cover: '.book__image',
  },
};

const templates = {
  bookTemp: Handlebars.compile(
    document.querySelector(select.templateOf.book).innerHTML
  ),
};

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

function initActions() {
  const thisBook = this;
  const favouriteBooks = [];
  console.log(favouriteBooks);

  thisBook.covers = document.querySelectorAll(select.bookInfo.cover);

  console.log(thisBook.covers);
  for (const cover of thisBook.covers) {
    console.log(cover);
    const coverID = cover.getAttribute('data-id');
    console.log(coverID);
    cover.addEventListener('dblclick', function () {
      event.preventDefault();
      cover.classList.add('favorite');
      if (!favouriteBooks.includes(cover)) {
        favouriteBooks.push(cover);
      }
    });
  }
  console.log(favouriteBooks);
}

renderHTML();
initActions();

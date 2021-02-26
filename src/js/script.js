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
    cover.addEventListener('dblclick', function () {
      event.preventDefault();

      const coverID = cover.getAttribute('data-id');
      console.log(coverID);
      if (!favouriteBooks.includes(coverID)) {
        cover.classList.add('favorite');
        favouriteBooks.push(coverID);
        console.log(favouriteBooks);
      } else {
        cover.classList.remove('favorite');
        favouriteBooks.splice(thisBook.coverID, 1);
        console.log(favouriteBooks);
      }
    });
  }
  console.log(favouriteBooks);
}

renderHTML();
initActions();

// ta druga funkcja cos szwankuje z preventDefault i nie jestem pewin czy dodanie do favouriteBooks jest tak jak ma byc

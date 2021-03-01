'use-strict';

const select = {
  templateOf: {
    book: '#template-book',
  },
  bookInfo: {
    list: '.books-list',
    cover: '.book__image',
    rating: '.book__rating__fill',
  },
  filters: {
    section: '.filters',
    filter: '.filters label input',
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
// console.log(books.covers);
books.list = document.querySelector(select.bookInfo.list);
// console.log(books.list);
books.rating = document.querySelectorAll(select.bookInfo.rating);
// console.log(books.rating);
books.filters = document.querySelectorAll(select.filters.filter);
// console.log(books.filters);

function renderHTML() {
  const thisBook = this;

  for (const item of dataSource.books) {
    // console.log(item);
    const ratingBgc = determineRatingBgc(item.rating);
    // console.log(ratingBgc);
    item.ratingBgc = ratingBgc;
    const ratingWidth = item.rating * 10;
    // console.log(ratingWidth);
    item.ratingWidth = ratingWidth;
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
  // const thisBook = this;
  const favouriteBooks = [];
  // console.log(favouriteBooks);

  books.list.addEventListener('dblclick', function (event) {
    event.preventDefault();

    if (event.target.offsetParent.classList.contains('book__image')) {
      // console.log(event.target);
      coverID = event.target.offsetParent.getAttribute('data-id');
      console.log(coverID);
      if (!favouriteBooks.includes(coverID)) {
        event.target.offsetParent.classList.add('favorite');
        favouriteBooks.push(coverID);
        // console.log(favouriteBooks);
      } else {
        event.target.offsetParent.classList.remove('favorite');
        const bookIndex = favouriteBooks.indexOf(coverID);
        favouriteBooks.splice(bookIndex, 1);
        // console.log(favouriteBooks);
      }
      // }
    }
    console.log(favouriteBooks);
  });

  filterSec.addEventListener('click', function () {
    if (event.target.name === 'filter' && event.target.type === 'checkbox') {
      if (event.target.checked) {
        filters.push(event.target.value);
      } else {
        const filterIndex = filters.indexOf(event.target.value);
        filters.splice(filterIndex, 1);
      }

      booksFilter();
    }
  });
}

function booksFilter() {
  // const thisBook = this;

  for (const book of dataSource.books) {
    let shouldBeHidden = false;

    for (const filter of filters) {
      if (!book.details[filter]) {
        shouldBeHidden = true;
        break;
      }
    }

    const bookCover = document.querySelector(
      '.book__image[data-id="' + book.id + '"]'
    );
    if (shouldBeHidden) bookCover.classList.add('hidden');
    else bookCover.classList.remove('hidden');
  }
}

function determineRatingBgc(rating) {
  let background;
  if (rating < 6) {
    background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
  } else if (rating > 6 && rating <= 8) {
    background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
  } else if (rating > 8 && rating <= 9) {
    background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
  } else if (rating > 9) {
    background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  }
  return background;
}

renderHTML();
initActions();

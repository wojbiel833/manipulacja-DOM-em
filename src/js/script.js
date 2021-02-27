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
books.rating = document.querySelectorAll(select.bookInfo.rating);
console.log(books.rating);

function renderHTML() {
  const thisBook = this;

  for (const item of dataSource.books) {
    console.log(item);
    const ratingBgc = determineRatingBgc(item.rating);
    console.log(ratingBgc);
    item.ratingBgc = ratingBgc;
    const ratingWidth = item.rating * 10;
    console.log(ratingWidth);
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

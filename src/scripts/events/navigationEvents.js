import { booksOnSale, getBooks } from '../../api/bookData';
import { showBooks } from '../components/pages/books';
import { showAuthors, emptyAuthors } from '../components/pages/authors';
import signOut from '../helpers/auth/signOut';
import { getAuthors, getFavoriteAuthor } from '../../api/authorData';

// navigation eventsavorite

const navigationEvents = (uid) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // BOOKS ON SALE // call function>.then((taco array)=>function to put cards on DOM(taco array))
  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale(uid).then((saleBooksArray) => showBooks(saleBooksArray));
    console.warn('CLICKED SALE BOOKS');
  });

  // ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks(uid).then((booksArray) => showBooks(booksArray));
    console.warn('CLICKED ALL BOOKS');
  });

  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(uid).then((authorsArray) => {
      if (authorsArray) {
        showAuthors(authorsArray);
      } else {
        emptyAuthors();
      }
    });
    console.warn('CLICKED ALL AUTHORS');
  });

  document.querySelector('#favorites').addEventListener('click', () => {
    getFavoriteAuthor(uid).then((favoriteAuthorsArray) => showAuthors(favoriteAuthorsArray));
    console.warn('CLICKED FAVORITES');
  });
  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    console.warn(searchValue);

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
      // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
      // OTHERWISE SHOW THE STORE

      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;

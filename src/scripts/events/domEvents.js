import { getSingleBook, deleteBook } from '../../api/bookData';
import { getSingleAuthor } from '../../api/authorData';
import { showBooks } from '../components/pages/books';
import { showAuthors } from '../components/pages/authors';
import { viewAuthorDetails, viewBookDetails, deleteAuthorBooks } from '../../api/mergedData';
import viewBook from '../components/pages/viewBook';
import viewAuthor from '../components/pages/viewAuthors';
import addBookForm from '../components/forms/addBookForm';
import addAuthorForm from '../components/forms/addAuthorForm';

const domEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(firebaseKey).then((booksArray) => showBooks(booksArray));
      }
    }

    // CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      console.warn('ADD BOOK');
      addBookForm(uid);
    }

    // CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      console.warn('EDIT BOOK', e.target.id);
      const [, firebaseKey] = e.target.id.split('--');

      // 1.pass the book***
      // 2.pass the book oject to book form***
      getSingleBook(firebaseKey).then((bookObj) => addBookForm(bookObj));
    }

    // CLICK EVENT FOR VIEW BOOK DETAILS //good
    if (e.target.id.includes('view-book-btn')) {
      console.warn('clicked view-btn');
      const [, bookFirebaseKey] = e.target.id.split('--');
      console.warn(e.target.id);
      viewBookDetails(bookFirebaseKey).then((bookAuthorObject) => viewBook(bookAuthorObject));
    }

    // CLICK EVENT FOR DELETING AN AUTHOR //good
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('delete author clicked', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');
        deleteAuthorBooks(firebaseKey).then(showAuthors);
      } // do not add uid to deleteAuthorBooks above
    }

    // CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR //good
    if (e.target.id.includes('add-author-btn')) {
      console.warn('Add Author', e.target.id);
      addAuthorForm(uid);
    }

    // CLICK EVENT FOR VIEW SINGLE AUTHOR //good
    if (e.target.id.includes('view-author-btn')) {
      console.warn('clicked view-author-btn');
      const [, authorFirebaseKey] = e.target.id.split('--');
      viewAuthorDetails(authorFirebaseKey).then((authorBooksObject) => viewAuthor(authorBooksObject));
    }
    // CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleAuthor(firebaseKey).then((authorObject) => addAuthorForm(authorObject));
    }
  });
};

export default domEvents;

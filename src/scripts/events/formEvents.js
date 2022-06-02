import { createBook, getBooks, updateBook } from '../../api/bookData';
import { createAuthor, getAuthors, updateAuthor } from '../../api/authorData';
import { showBooks } from '../components/pages/books';
import { showAuthors } from '../components/pages/authors';

const formEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();
    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      console.warn('CLICKED SUBMIT BOOK', e.target.id);
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        description: document.querySelector('#description').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author_id').value,
        uid
      };
      createBook(bookObject).then((booksArray) => showBooks(booksArray));
    }

    // CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      const [, firebaseKey] = e.target.id.split('--');
      console.warn('CLICKED UPDATE BOOK', e.target.id);
      console.warn(firebaseKey);
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        description: document.querySelector('#description').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author_id').value,
        firebaseKey
      };
      updateBook(bookObject, uid).then(() => {
        getBooks(uid).then((response) => showBooks(response));
      });
    }
    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      console.warn('CLICKED SUBMIT AUTHOR');
      const authorObject = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').checked,
        uid
      };
      createAuthor(uid, authorObject).then((authorArray) => showAuthors(authorArray));
    }

    // ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');
      console.warn('CLICKED UPDATE AUTHOR', e.target.id);
      console.warn(firebaseKey);
      const authorObject = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').checked,
        firebaseKey
      };
      updateAuthor(authorObject).then(() => {
        getAuthors(uid).then((response) => showAuthors(response));
      });
    }
  });
};
export default formEvents;

import { getBooks, deleteBook } from '../../api/bookData';
import { getAuthors, getFavoriteAuthor, deleteAuthor } from '../../api/authorData';
import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/domBuilder';
import navBar from '../components/navBar';
import domEvents from '../events/domEvents';
import formEvents from '../events/formEvents';
import navigationEvents from '../events/navigationEvents';
import { showBooks } from '../components/pages/books';
import { showAuthors } from '../components/pages/authors';
import addBookForm from '../components/forms/addBookForm';

const startApp = () => {
  domBuilder(); // BUILD THE DOM
  domEvents(); // ADD THE EVENT LISTENTERS TO THE DOM
  formEvents(); // ADD FORM EVENT LISTENTERS TO THE DOM
  navBar(); // DYNAMICALLY ADD THE NAV
  logoutButton(); // ADD THE LOGOUT BUTTON COMPONENT
  navigationEvents(); // ATTACH THE EVENT LISTENERS TO THE NAVBAR
  // TODO: Put all books on the DOM on App load
  getBooks().then((booksArray) => showBooks(booksArray));
  getAuthors().then((authorsArray) => showAuthors(authorsArray));
  getFavoriteAuthor();
  addBookForm();
  deleteBook();
  deleteAuthor();
};
export default startApp;

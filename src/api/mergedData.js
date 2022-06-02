import { deleteBook, getSingleBook } from './bookData';
import { getSingleAuthor, getAuthorsBooks, deleteSingleAuthor } from './authorData';

const viewBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebaseKey)
    .then((bookObject) => {
      getSingleAuthor(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
      console.warn(bookObject);
    }).catch((error) => reject(error));
});

const deleteAuthorBooks = (authorId) => new Promise((resolve, reject) => {
  getAuthorsBooks(authorId).then((booksArray) => {
    const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));
    // console.warn(deleteBookPromises);
    // STORING PROMISES IN VARIABLE TO HAVE EASIER ACCESS TO THE ARRAY OF PROMISES USING .THEN LATER
    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(authorId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const viewAuthorDetails = (authorFirebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(authorFirebaseKey)
    .then((authorObject) => {
      getAuthorsBooks(authorObject)
        .then((authorBooks) => {
          resolve({ authorBooks, ...authorObject });
        });
    }).catch((error) => reject(error));
});

export { viewBookDetails, viewAuthorDetails, deleteAuthorBooks };

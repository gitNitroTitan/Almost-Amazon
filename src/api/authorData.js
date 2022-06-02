import axios from 'axios';
import firebaseConfig from './apiKeys';

const dbUrl = firebaseConfig.databaseURL;

// GET ALL AUTHORS // good
const getAuthors = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// CREATE AUTHOR // good
const createAuthor = (uid, authorObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, authorObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, payload)
        .then(() => {
          getAuthors(uid).then(resolve);
        });
    }).catch(reject);
});

// GET SINGLE AUTHOR // good
const getSingleAuthor = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/${firebaseKey}.json`, uid)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
// GET FAVORITE AUTHOR // good
const getFavoriteAuthor = (uid) => new Promise((resolve, reject) => {
  getAuthors(uid)
    .then((userAuthors) => {
      const favAuthors = userAuthors.filter((author) => (author.favorite));
      resolve(favAuthors);
    }).catch((error) => reject(error));

  // axios.get(`${dbUrl}/authors.json?orderBy="favorite"&equalTo=true`)
  //   .then((response) => resolve(Object.values(response.data)))
  //   .catch((error) => reject(error));
});

// DELETE AUTHOR //good
const deleteSingleAuthor = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/authors/${firebaseKey}.json`, uid)
    .then(() => {
      getAuthors(uid).then((authorsArray) => resolve(authorsArray));
    })
    .catch((error) => reject(error));
});

// GET AUTHORS BOOKS
const getAuthorsBooks = (authorId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy= "author_id" &equalTo="${authorId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// UPDATE AUTHOR // good
const updateAuthor = (authorObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/authors/${authorObject.firebaseKey}.json`, authorObject)
    .then(() => getAuthors(authorObject.uid).then(resolve))
    .catch((error) => reject(error));
});

export {
  getAuthors,
  createAuthor,
  getFavoriteAuthor,
  deleteSingleAuthor,
  updateAuthor,
  getSingleAuthor,
  getAuthorsBooks
};

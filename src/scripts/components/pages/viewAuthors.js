import clearDom from '../../helpers/clearDom';
import renderToDOM from '../../helpers/renderToDom';

const viewAuthor = (obj) => {
  clearDom();

  let domString = '';
  let domString2 = '';

  domString += `
  <div class="mt-5 d-flex flex-wrap">
   <div class="d-flex flex-column">
   <h5 class="card-title">${obj.first_name} ${obj.last_name}</h5>
   <h6 class="card-subtitle mb-2 text-muted">${obj.email}</h6>
   <p class="card-text bold">${obj.favorite ? '<span class="badge badge-info sale-badge"><i class="fa fa-heart" aria-hidden="true"></i> Favorite' : ''}</p>
      </div>
    </div>`;

  obj.authorBooks.forEach((books) => {
    domString2 += `
        <div class="card">
          <img class="card-img-top" src=${books.image} alt=${books.title} style="background-color: rgba(245, 245, 245, 0.4)" style="width: 100px;">
          <div class="card-body" style="height: 100px;">
          <h5 class="card-title">${books.title}</h5>
          <p class="card-text bold">${books.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${books.price}` : `$${books.price}`}</p>
          <hr>
          <i class="btn btn-success fas fa-eye" id="view-book-btn--${books.firebaseKey}"></i>
          <i id="edit-book-btn--${books.firebaseKey}" class="fas fa-edit btn btn-info"></i>
          <i id="delete-book-btn--${books.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
          </div>
        </div>`;
  });
  renderToDOM('#store', domString);
  renderToDOM('#view', domString2);
};

export default viewAuthor;

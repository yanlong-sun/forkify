import View from './view';
import icons from 'url:../../img/icons.svg';
class ResultsView extends View {
  _errorMessage = 'No recipe found in your query, Try again!';
  _message = '';
  _parentElement = document.querySelector('.results');
  _generateMarkup() {
    return this._data.map(this._generateMarkupPerview).join('');
  }
  _generateMarkupPerview(preview) {
    return `    
        <li class="preview">
            <a class="preview__link" href="#${preview.id}">
              <figure class="preview__fig">
                <img src="${preview.image}" alt="${preview.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${preview.title}</h4>
                <p class="preview__publisher">${preview.publisher}</p>
              </div>
            </a>
        </li>`;
  }
}

export default new ResultsView();

import View from './view';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _prevBtn = document.querySelector('.pagination__btn--prev');
  _nextBtn = document.querySelector('.pagination__btn--next');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const pageGoTo = +btn.dataset.goto;
      handler(pageGoTo);
    });
  }
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page1 and there are other pages
    if (this._data.page === 1 && numPages > 1) return this._nextMarkup(2);
    // page 1 and there are no other pages
    if (this._data.page === 1) return '';
    // last page
    if (this._data.page === numPages) return this._prevMarkup(numPages - 1);
    // other page
    return this._prevMarkup(this._data.page - 1).concat(
      this._nextMarkup(this._data.page + 1)
    );
  }
  _prevMarkup = function (pageNum) {
    return `
        <button data-goto='${pageNum}' class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${pageNum}</span>
        </button>`;
  };
  _nextMarkup = function (pageNum) {
    return `
        <button data-goto='${pageNum}' class="btn--inline pagination__btn--next">
                <span>Page ${pageNum}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
        </button>`;
  };
}
export default new PaginationView();

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // 1) loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;
    // 2) Rendering recipe
    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    //1) get search query
    const query = searchView.getQuery();
    // 2) load search results
    if (!query) return;
    await model.loadSearchResult(query);
    // 3) render results
    resultView.render(model.getSearchResultsPage());
    // 4) render initial pagination options
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (pageGoTo) {
  // render new results
  resultView.render(model.getSearchResultsPage(pageGoTo));
  // render new pagination options
  paginationView.render(model.state.search);
};

const controlServings = function (updateServings) {
  // update the recipe serveings(in state)
  model.updateServings(updateServings);
  // update the recipe view (only change the changed part
  // instead of the whole recipe, so created a new method)
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();

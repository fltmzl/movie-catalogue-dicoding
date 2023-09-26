/* eslint-disable no-new */
import FavoriteMovieIdb from "../../data/favorite-movie-idb";
import FavoriteMovieView from "./liked-movies/favorite-movie-view";
import FavoriteMovieShowPresenter from "./liked-movies/favorite-movie-show-presenter";
import FavoriteMovieSearchPresenter from "./liked-movies/favorite-movie-search-presenter";

const view = new FavoriteMovieView();

const Like = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    // const moviesContainer = document.getElementById("movies");
    // const movies = await FavoriteMovieIdb.getAllMovies();

    // movies.forEach((movie) => {
    //   moviesContainer.innerHTML += createMovieItemTemplate(movie);
    // });

    new FavoriteMovieShowPresenter({
      view,
      favoriteMovies: FavoriteMovieIdb,
    });

    new FavoriteMovieSearchPresenter({
      view,
      favoriteMovies: FavoriteMovieIdb,
    });
  },
};

export default Like;

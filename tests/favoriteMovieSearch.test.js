/* eslint-disable no-unused-vars */
import FavoriteMoviesSearchPresenter from "../src/scripts/views/pages/liked-movies/favorite-movie-search-presenter";
import FavoriteMovieView from "../src/scripts/views/pages/liked-movies/favorite-movie-view";

describe("Searching Movie", () => {
  let presenter;
  let favoriteMovies;
  let view;

  const searchMovies = (query) => {
    const queryElement = document.getElementById("query");
    queryElement.value = query;
    queryElement.dispatchEvent(new Event("change"));
  };

  const setMovieSearchContainer = () => {
    view = new FavoriteMovieView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    // spyOn(FavoriteMovieIdb, "searchMovies");
    // presenter = new FavoriteMoviesSearchPresenter({
    //   favoriteMovies: FavoriteMovieIdb,
    // });

    favoriteMovies = {
      getAllMovies: jest.fn(),
      searchMovies: jest.fn(),
    };

    presenter = new FavoriteMoviesSearchPresenter({
      favoriteMovies,
      view,
    });
  };

  beforeEach(() => {
    setMovieSearchContainer();
    constructPresenter();
  });

  describe("When query is not empty", () => {
    it("should be able to capture the query typed by the user", () => {
      favoriteMovies.searchMovies.mockImplementation(() => []);

      searchMovies("film a");

      expect(presenter.latestQuery).toEqual("film a");
    });

    it("should ask the model to search for liked movies", () => {
      favoriteMovies.searchMovies.mockImplementation(() => []);

      searchMovies("film a");

      expect(favoriteMovies.searchMovies).toHaveBeenCalledWith("film a");
    });

    // it("should show the found movies", () => {
    //   presenter._showFoundMovies([{ id: 1 }]);

    //   const foundMovies = document.querySelectorAll(".movie");
    //   expect(foundMovies.length).toEqual(1);

    //   presenter._showFoundMovies([
    //     {
    //       id: 1,
    //       title: "Satu",
    //     },
    //     {
    //       id: 2,
    //       title: "Dua",
    //     },
    //   ]);

    //   expect(document.querySelectorAll(".movie").length).toEqual(2);
    // });

    // it("should show the title of the found movies", () => {
    //   presenter._showFoundMovies([
    //     {
    //       id: 1,
    //       title: "Satu",
    //     },
    //   ]);

    //   expect(document.querySelectorAll(".movie__title").item(0).textContent).toEqual("Satu");

    //   presenter._showFoundMovies([
    //     {
    //       id: 1,
    //       title: "Satu",
    //     },
    //     {
    //       id: 2,
    //       title: "Dua",
    //     },
    //   ]);

    //   const movieTitles = document.querySelectorAll(".movie__title");
    //   expect(movieTitles.item(0).textContent).toEqual("Satu");
    //   expect(movieTitles.item(1).textContent).toEqual("Dua");
    // });

    // it("should show - for found movie without title", () => {
    //   presenter._showFoundMovies([{ id: 1 }]);
    //   expect(document.querySelectorAll(".movie__title").item(0).textContent).toEqual("-");
    // });

    it("should show the movies found by Favorite Movies", (done) => {
      document
        .getElementById("movies")
        .addEventListener("movies:updated", () => {
          expect(document.querySelectorAll(".movie-item").length).toEqual(3);

          done();
        });

      favoriteMovies.searchMovies.mockImplementation((query) => {
        if (query === "film a") {
          return [
            { id: 111, title: "film abc" },
            { id: 222, title: "ada juga film abcde" },
            { id: 333, title: "ini juga boleh film a" },
          ];
        }

        return [];
      });

      searchMovies("film a");
    });

    it("should show the name of the movies found by Favorite Movies", (done) => {
      document
        .getElementById("movies")
        .addEventListener("movies:updated", () => {
          const movieTitles = document.querySelectorAll(".movie__title");
          expect(movieTitles.item(0).textContent).toEqual("film abc");
          expect(movieTitles.item(1).textContent).toEqual("ada juga film abcde");
          expect(movieTitles.item(2).textContent).toEqual("ini juga boleh film a");
          done();
        });

      favoriteMovies.searchMovies.mockImplementation((query) => {
        if (query === "film a") {
          return [
            { id: 111, title: "film abc" },
            { id: 222, title: "ada juga film abcde" },
            { id: 333, title: "ini juga boleh film a" },
          ];
        }
        return [];
      });

      searchMovies("film a");
    });

    it("should show - when the movie returned does not contain a title", (done) => {
      document.getElementById("movies")
        .addEventListener("movies:updated", () => {
          const movieTitles = document.querySelectorAll(".movie__title");
          expect(movieTitles.item(0).textContent)
            .toEqual("-");

          done();
        });

      favoriteMovies.searchMovies.mockImplementation((query) => {
        if (query === "film a") {
          return [{ id: 444 }];
        }

        return [];
      });

      searchMovies("film a");
    });
  });

  describe("When query is empty", () => {
    it("should capture the query as empty", () => {
      favoriteMovies.getAllMovies.mockImplementation(() => []);

      searchMovies(" ");
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies("      ");
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies("");
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies("\t");
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it("should show all favorite movies", () => {
      favoriteMovies.getAllMovies.mockImplementation(() => []);

      searchMovies("    ");

      expect(favoriteMovies.getAllMovies).toHaveBeenCalled();
    });
  });

  describe("When no favorite movies could be found", () => {
    it("should show the empty message", (done) => {
      document
        .getElementById("movies")
        .addEventListener("movies:updated", () => {
          expect(document.querySelectorAll(".movie-item__not__found").length).toEqual(1);
          done();
        });

      favoriteMovies.searchMovies.mockImplementation((query) => []);
      searchMovies("film a");
    });

    it("should not show any movie", (done) => {
      document.getElementById("movies")
        .addEventListener("movies:updated", () => {
          expect(document.querySelectorAll(".movie-item").length).toEqual(0);
          done();
        });

      favoriteMovies.searchMovies.mockImplementation((query) => []);
      searchMovies("film a");
    });
  });
});

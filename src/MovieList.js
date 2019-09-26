import React from "react";

import { connect } from "react-redux";

import SearchBar from "./SearchBar";
import { toggle_Watched, delete_movie } from "./redux/actions";

class MovieList extends React.Component {

  state = {
    query: ""
  };

  filterMovies = query => {
    this.setState({ query: query.toLowerCase() });
  };

  nofilterMovies = () => {
    let filteredMovies = this.props.movies.filter(movie =>
      movie.title.toLowerCase().includes(this.state.query)
    );

    return filteredMovies;
  };

  render() {
    let fullListSize = 0;
    let MovieList = this.nofilterMovies().map(movie => {
        let button_text = movie.watched ? "Unwatch" : "Watch";
        return (
          <li class="list-group-item">
            {movie.title}
            <div className="float-right">
              <button
                type="button "
                class="btn btn-primary ml-5"
                onClick={() => this.props.toggle_Watched(movie.id)}
              >
                {button_text}
              </button>
              <button
                type="button"
                class="btn btn-danger ml-5  "
                onClick={() => this.props.delete_movie(movie.id)}
              >
                Delete
              </button>
            </div>
          </li>
        );
    });
    if (MovieList.length === 0) {
      MovieList = <li class="list-group-item"> Nothing Found</li>;
    }
    return (
      <>
      
        <div className="container w-75  ">
          <ul class="list-group">
            <li class="list-group-item">
              <SearchBar filter={this.filterMovies} />
            </li>
            {MovieList}
          </ul>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    movies: state.movies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggle_Watched: movieID => dispatch(toggle_Watched(movieID)),
    delete_movie: movieID => dispatch(delete_movie(movieID))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieList);
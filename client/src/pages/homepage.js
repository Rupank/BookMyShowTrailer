import React, { Component } from 'react'
import MovieListing from '../features/movie-listing';
import Filter from '../components/Filter';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProducts, getFilteredProducts, getProductsError, getProductsPending, getLanguageList, getGenreList, getAppliedFilters } from '../reducers/productReducer';
import { fetchMovies, filterMovies } from '../actions/productActions';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.shouldComponentRender = this.shouldComponentRender.bind(this);
    }

    componentDidMount() {
        const { fetchMovies } = this.props;
        fetchMovies();
    }

    applyFilter(params) {
        const { movieList, filterMovies } = this.props;
        filterMovies(movieList, params);
    }

    render() {
        const { filtereMoviesList, error, langList, genreList, appliedFilters } = this.props;
        if (!this.shouldComponentRender()) return (
            <div>Loading...</div>
        )
        if (error) return (
            <div>
                {error}
            </div>
        )
        return (
            <div>
                <Filter langList={langList} genreList={genreList} handleFilter={(e) =>
                    this.applyFilter(e)} />
                <MovieListing movies={filtereMoviesList} />
            </div>
        )
    }

    shouldComponentRender() {
        const { isLoading } = this.props;
        if (isLoading) {
            return false;
        } else {
            return true;
        }
    }
}


const mapStateToProps = (state) => ({
    movieList: getProducts(state),
    filtereMoviesList: getFilteredProducts(state),
    error: getProductsError(state),
    isLoading: getProductsPending(state),
    langList: getLanguageList(state),
    genreList: getGenreList(state),
    appliedFilters: getAppliedFilters(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchMovies: fetchMovies,
    filterMovies: filterMovies
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

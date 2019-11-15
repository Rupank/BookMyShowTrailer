import React from 'react';
import MovieListItem from './movie-list-item';
export default function MovieListing(props) {
    return <div className="movie-listing">
        {
            props.movies.map(movie =>
                <MovieListItem movie={movie} key={movie.EventCode} />)
        }
    </div>
}
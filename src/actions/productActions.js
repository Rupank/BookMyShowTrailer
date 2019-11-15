import { FETCH_MOVIES_REQUESTED, FETCH_MOVIES_SUCCEEDED, FETCH_MOVIES_FAILED, FILTER_MOVIES } from './types';
import * as _ from 'lodash';
export function fetchMovies() {
    return function (dispatch) {
        let requestURL = 'https://cors-anywhere.herokuapp.com/https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=cs';

        dispatch({
            type: FETCH_MOVIES_REQUESTED,
        });

        fetch(requestURL)
            .then(response => response.json())
            .then(parsedData => {
                let data = _.values(parsedData[1]);
                let genreList = _.uniq(_.map(data, 'EventGenre'));
                let uniqueGenreList = [];
                genreList.forEach(ele => {
                    let temp = ele.split('|');
                    temp.forEach(val => uniqueGenreList.push(_.capitalize(val)));
                    uniqueGenreList = _.uniq(uniqueGenreList);
                })
                uniqueGenreList = _.uniq(uniqueGenreList);
                dispatch({ type: FETCH_MOVIES_SUCCEEDED, payload: { lang: parsedData[0], data: data, genre: uniqueGenreList } })
            })
            .catch(error => dispatch({
                type: FETCH_MOVIES_FAILED,
                payload: { error: error }
            }));
    }
}


export const filterMovies = (movieList, filters) => (dispatch) => {

    if (filters.genre.length === 0 && filters.lang.length === 0) {
        return dispatch({
            type: FILTER_MOVIES,
            payload: {
                filters: filters,
                data: movieList
            }
        })

    } else {
        let commonGenreElements = [];
        filters.genre.forEach(ele => {
            let filteredArr = movieList.filter(movie =>
                (movie.EventGenre).toLowerCase().indexOf(ele.toLowerCase()) != -1
            );
            commonGenreElements.push(...filteredArr);
            commonGenreElements = _.uniq(commonGenreElements);
        })
        commonGenreElements = _.uniq(commonGenreElements);

        let commonLanguageElements = [];
        filters.lang.forEach(ele => {
            let filteredArr = movieList.filter(movie =>
                (movie.EventLanguage).toLowerCase().indexOf(ele.toLowerCase()) != -1
            );
            commonLanguageElements.push(...filteredArr);
            commonLanguageElements = _.uniq(commonLanguageElements);
        })
        commonLanguageElements = _.uniq(commonLanguageElements);
        let finalList = [...commonGenreElements, ...commonLanguageElements];
        finalList = _.uniq(finalList);
        return dispatch({
            type: FILTER_MOVIES,
            payload: {
                filters: filters,
                data: finalList
            }
        })
    }
}

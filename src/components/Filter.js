import React, { useState, useEffect } from 'react'
import * as _ from 'lodash';
export default function Filter(props) {


    const [showGenre, setShowGenre] = useState(false);
    const [showLanguage, setShowLanguage] = useState(false);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const { langList, genreList, handleFilter } = props;

    useEffect(() => {
        let object = {
            "lang": selectedLanguages,
            "genre": selectedGenres
        }
        handleFilter(object);
    }, [selectedGenres, selectedLanguages])

    function setChecked(type, val) {
        if (type === "Language") {
            let arr = selectedLanguages.filter(a => a === val);
            if (arr.length > 0) {
                return true;
            }
            return false;
        } else {
            let arr = selectedGenres.filter(a => a === val);
            if (arr.length > 0) {
                return true;
            }
            return false;
        }
    }

    const handleLanguageClick = (e) => {

        let index = selectedLanguages.indexOf(e.target.value);
        let temp_state = selectedLanguages;
        if (index > -1) {
            temp_state.splice(index, 1);
            setSelectedLanguages([...temp_state]);
        } else {
            setSelectedLanguages([...selectedLanguages, e.target.value])
        }
    }
    const handleGenreClick = (e) => {
        let index = selectedGenres.indexOf(e.target.value);
        let temp_state = selectedGenres;
        if (index > -1) {
            temp_state.splice(index, 1);
            setSelectedGenres([...temp_state]);
        } else {
            setSelectedGenres([...selectedGenres, e.target.value])
        }

    }

    return (
        <div className="filter-div">
            <div onMouseEnter={() => setShowGenre(true)}
                onMouseLeave={() => setShowGenre(false)} >
                <label>Genre
                    {showGenre && genreList &&
                        <ul>
                            {
                                genreList.map(genre => (
                                    <li key={genre}>
                                        <input id={genre} type="checkbox" value={genre} autoComplete="off"
                                            onClick={handleGenreClick}
                                            defaultChecked={setChecked("Genre", genre)}
                                        />
                                        <label>{genre}</label>
                                    </li>
                                ))
                            }
                        </ul>
                    }
                </label>
            </div>
            <div onMouseEnter={() => setShowLanguage(true)}
                onMouseLeave={() => setShowLanguage(false)}>
                <label > Lanaguages
                    {showLanguage && langList &&
                        <ul>
                            {
                                langList.map(language => (
                                    <li key={language}>
                                        <input id={language} type="checkbox" value={language} autoComplete="off"
                                            onClick={handleLanguageClick}
                                            defaultChecked={setChecked("Language", language)} />
                                        <label>{language}</label>
                                    </li>
                                ))
                            }
                        </ul>
                    }
                </label>
            </div>
        </div>
    )
}

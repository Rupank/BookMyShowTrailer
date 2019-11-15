
import React from 'react';

export default function MovieListItem({ movie }) {

    const { EventTitle, EventGenre, EventLanguage, TrailerURL } = movie;
    let embedTrailerURL, imgURL;
    if (TrailerURL) {
        let VID_REGEX =
            /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        let videoID = TrailerURL.match(VID_REGEX)[1];
        embedTrailerURL = TrailerURL.replace('watch?v=', 'embed/');
        imgURL = `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`;
    }
    return <aside className="movie-list-item">

        <div className="poster-container" style={{ position: 'relative' }}>
            {
                TrailerURL && imgURL &&
                <img src={imgURL} className="movie-poster" />
            }
            <img className="play-btn" src="/play.png" />
        </div>
        <p className="movie-title"> {EventTitle}</p>

        <div className="infobox">
            <iframe title={EventTitle}
                src={embedTrailerURL}>
            </iframe>
        </div>
    </aside >
}


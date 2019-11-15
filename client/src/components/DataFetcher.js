import React, { useState, useEffect } from 'react'

function DataFetcher() {

    const [data, setData] = useState([]);
    const [lang, setLang] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchData() {
            let requestURL = 'https://cors-anywhere.herokuapp.com/https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=cs';
            let res = await fetch(requestURL);
            let parsedData = await res.json();
            let dataObject = parsedData[1];
            let arr = [],
                keys = Object.keys(dataObject);
            for (let i = 0, n = keys.length; i < n; i++) {
                let key = keys[i];
                arr[key] = dataObject[key];
            }
            setLang([parsedData[0]]);
            setData(arr);
            console.log(lang);
        }
        fetchData();
    }, []);

    useEffect(() => {
        setLoading(false);
        console.log(data);
    }, [data])


    return (
        <div>
            {
                isLoading && <div> Loading Content...</div>
            }
            {
                lang.map((index, movie) => (
                    <li key={index}> {movie}</li>
                ))
            }
        </div>
    )
}

export default DataFetcher

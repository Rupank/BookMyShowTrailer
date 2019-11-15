import React, { Component } from 'react'

class DataClass extends Component {

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        let requestURL = 'https://cors-anywhere.herokuapp.com/https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=cs';
        fetch(requestURL, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                data.json().then(res => {
                    console.log(res);
                })
            })
            .catch(err => {

            })
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default DataClass

import React, {useState} from "react";
import axios from "axios";
import SearchBar from "./components/searchBar.jsx";
import CityTemp from "./components/cityTemp.jsx";


function App() {

    // const [location, setLocation] = useState("")
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8528a0f2485fa77b6744a85922e2c69a`
    // const [data, setData] = useState({})
    //
    // const searchLocation = (event) => {
    //     if (event.key === 'Enter') {
    //         axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8528a0f2485fa77b6744a85922e2c69a`).then((response) => {
    //             setData(response.data)
    //         }).catch((error) => {
    //             console.log(error)
    //         })
    //     }
    // }


    return (

        <div>

<SearchBar/>

<CityTemp/>

        </div>


    )
}

export default App

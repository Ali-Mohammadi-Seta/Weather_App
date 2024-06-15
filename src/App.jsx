import React, {useState} from "react";
import axios from "axios";
import SearchBar from "./components/searchBar.jsx";
import CityTemp from "./components/cityTemp.jsx";


function App() {

    const [backgroundStyle, setBackgroundStyle] = useState({});




    return (

        <div className="relative w-full h-screen ">
            {/* The background container */}
            <div
                className="background-container absolute top-0 left-0 w-full h-full "
                style={{ ...backgroundStyle, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', zIndex: -1 }}
            ></div>
            <div className="background-overlay absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            <div className="relative z-10">
                <SearchBar />
                <CityTemp setBackgroundStyle={setBackgroundStyle} />
            </div>
        </div>


    )
}

export default App

// cityTemp.jsx
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux';
import cloudsDay from '../assets/CloudsDay.jpg'
import cloudsNight from '../assets/CloudsNight.jpg'
import rainNight from '../assets/RainNight.jpg'
import rainDay from '../assets/RainDay.jpg'
import clearDay from '../assets/ClearDay.jpg'
import clearNight from '../assets/ClearNight.jpg'
import snowDay from '../assets/SnowDay.jpg'
import snowNight from '../assets/SnowNight.jpg'
import hazeDay from '../assets/HazeDay.jpg'
import hazeNight from '../assets/HazeNight.jpg'

const CityTemp = ({setBackgroundStyle}) => {
    const {loading, data, error} = useSelector((state) => state);


    const getLocalTime = (timezoneOffset) => {
        const now = new Date();
        const utcTime = now.getTime() + now.getTimezoneOffset() * 60000; // Convert to UTC
        const localTime = new Date(utcTime + timezoneOffset * 1000); // Adjust to local time
        return localTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}); // Format time
    };

    const isDayTime = () => {
        const timezoneOffset = data.timezone || 0;
        const now = new Date();
        const hour = now.getUTCHours() + timezoneOffset / 3600;
        return hour >= 6 && hour < 18;
    };

    const textColor = isDayTime() ? 'black' : 'white';


    const dayTime = {
        Rain: {backgroundImage: `url(${rainDay})`},
        Clear: {backgroundImage: `url(${clearDay})`},
        Clouds: {backgroundImage: `url(${cloudsDay})`},
        Snow: {backgroundImage: `url(${snowDay})`},
        Haze: {backgroundImage: `url(${hazeDay})`},
        Fog: {backgroundImage: `url(${hazeDay})`},
        sand: {backgroundImage: `url(${hazeDay})`},
    };

    const nightTime = {
        Rain: {backgroundImage: `url(${rainNight})`},
        Clear: {backgroundImage: `url(${clearNight})`},
        Clouds: {backgroundImage: `url(${cloudsNight})`},
        Snow: {backgroundImage: `url(${snowNight})`},
        Haze: {backgroundImage: `url(${hazeNight})`},
        Fog: {backgroundImage: `url(${hazeNight})`},
        sand: {backgroundImage: `url(${hazeNight})`},
    };
    const getBackgroundStyle = () => {
        const weatherMain = data.weather && data.weather.length > 0 ? data.weather[0].main : null;
        const timezoneOffset = data.timezone || 0;
        const now = new Date();
        const hour = now.getUTCHours() + timezoneOffset / 3600;
        const isDay = hour >= 6 && hour < 18;
        return isDay ? dayTime[weatherMain] : nightTime[weatherMain];
    };

    const animationDay = {
        Rain: "https://lottie.host/f05695c2-2f1b-4747-b175-79057d0ca660/gsG9pZHp1w.json",
        Clear: "https://lottie.host/ff14d40f-7962-4ff6-8179-90f0653f61f4/orsgLjt11R.json",
        Clouds: "https://lottie.host/34b26663-65b0-424c-9a86-6a27d2da7ddd/wJuHuuy5lU.json",
        Snow: "https://lottie.host/00b4eb1f-d297-4e89-a01a-18e1a68c59f8/kr8lKhDuvx.json",
        Haze: "https://lottie.host/fac827c4-8b62-4e43-87bb-ba3c8cadf385/F52Qt9k0Yl.json",
        Fog: "https://lottie.host/fac827c4-8b62-4e43-87bb-ba3c8cadf385/F52Qt9k0Yl.json",
        sand: "https://lottie.host/fac827c4-8b62-4e43-87bb-ba3c8cadf385/F52Qt9k0Yl.json",
    };

    const animationNight = {
        Rain: "https://lottie.host/5eafa51a-a952-449b-a4e2-625095b0373f/5Gtwfit4gG.json",
        Clear: "https://lottie.host/916cbb86-9cf0-4abb-b11d-0cf9ba8e0b50/vuotpcLpNI.json",
        Clouds: "https://lottie.host/92d62636-b9bd-440a-9a88-da04dfb20a60/qTmS9lNGyM.json",
        Snow: "https://lottie.host/b669068b-0107-46ea-9f4b-77ab6c40a7c0/2u2pnrnqC4.json",
        Haze: "https://lottie.host/6f7d9f26-ef38-4761-bcdc-e9dc055f40e4/Pkcenpqsb1.json",
        Fog: "https://lottie.host/6f7d9f26-ef38-4761-bcdc-e9dc055f40e4/Pkcenpqsb1.json",
        sand: "https://lottie.host/6f7d9f26-ef38-4761-bcdc-e9dc055f40e4/Pkcenpqsb1.json",
    };


    useEffect(() => {
        // Dynamically import the DotLottie player
        import('@dotlottie/player-component/dist/dotlottie-player.mjs');
    }, []);

    const getAnimationUrl = () => {
        const weather = data.weather && data.weather[0].main;
        const timezoneOffset = data.timezone || 0;
        const now = new Date();
        const hour = now.getUTCHours() + timezoneOffset / 3600;
        const isDay = hour >= 6 && hour < 18;

        return isDay ? animationDay[weather] : animationNight[weather];
    };

    const animationUrl = getAnimationUrl();



    useEffect(() => {
        if (data) {
            const backgroundStyle = getBackgroundStyle();
            setBackgroundStyle(backgroundStyle);
        }
    }, [data, setBackgroundStyle]);


    return (


        <div className='items-center mx-auto max-w-[1640px] text-purple-700 '
             style={{...getBackgroundStyle(), backgroundSize: 'cover', backgroundRepeat: 'no-repeat' , color: textColor}}>
            {loading ? (
                <div className='text-center'>Loading...
                    <span className="loading loading-spinner loading-md"></span></div>
            ) : error ? (
                <div>
                    <div role="alert" className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                             viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{error}</span>
                    </div>
                </div>
            ) : (
                <div className=' text-center'>
                    <h1 className='font-bold text-center text-4xl lg:text-7xl md:text-5xl pt-10'>{data.name}</h1>
                    <div className='flex justify-center items-center'>
                        {animationUrl && (
                            <dotlottie-player
                                src={animationUrl}
                                background="transparent"
                                speed="1"
                                style={{width: 300, height: 300}}
                                loop
                                autoplay
                            ></dotlottie-player>
                        )}</div>

                    {data.main && (
                        <div className='items-center'>
                            <p className='pb-10 pt-5 text-center text-4xl lg:text-7xl md:text-5xl font-bold'>
                                {data.main.temp}°C
                            </p>

                            <div className='grid grid-cols-1 gap-6  mx-auto   justify-items-center pb-10'>
                                <p className='pb-5 border rounded w-[300px] glass '>Weather: {data.weather[0].main}</p>
                                <p className='pb-5 border rounded w-[300px] glass'>Humidity: {data.main.humidity}%</p>
                                <p className='pb-5 border rounded w-[300px] glass '>Wind
                                    Speed: {data.wind.speed} MPH</p>
                                <p className='pb-5 border rounded w-[300px] glass'>
                                    Feels Like: {data.main.feels_like}°C
                                </p>
                                <p className="pb-5 border rounded w-[300px] glass">Local
                                    Time: {getLocalTime(data.timezone)}</p>
                            </div>
                        </div>

                    )}
                </div>
            )}
        </div>
    );
};

CityTemp.propTypes = {
    setBackgroundStyle: PropTypes.func.isRequired, // Define prop type and mark as required
};

export default CityTemp;

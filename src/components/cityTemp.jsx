// cityTemp.jsx
import React, {useEffect, useState} from 'react';
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

const CityTemp = () => {
    const {loading, data, error} = useSelector((state) => state);


    const getLocalTime = (timezoneOffset) => {
        const now = new Date();
        const utcTime = now.getTime() + now.getTimezoneOffset() * 60000; // Convert to UTC
        const localTime = new Date(utcTime + timezoneOffset * 1000); // Adjust to local time
        return localTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}); // Format time
    };


    const dayTime = {
        Rain: {backgroundImage: `url(${rainDay})`},
        Clear: {backgroundImage: `url(${clearDay})`},
        Clouds: {backgroundImage: `url(${cloudsDay})`},
        Snow: {backgroundImage: `url(${snowDay})`},
        Haze: {backgroundImage: `url(${hazeDay})`},
        // Fog:{},
        // sand:{},
    };

    const nightTime = {
        Rain: {backgroundImage: `url(${rainNight})`},
        Clear: {backgroundImage: `url(${clearNight})`},
        Clouds: {backgroundImage: `url(${cloudsNight})`},
        Snow: {backgroundImage: `url(${snowNight})`},
        Haze: {backgroundImage: `url(${hazeNight})`},
        // Fog:{},
        // sand:{},
    };
    const getBackgroundStyle = () => {
        const weatherMain = data.weather && data.weather.length > 0 ? data.weather[0].main : null;
        const timezoneOffset = data.timezone || 0; // Ensure a default value (0) if data.timezone is falsy

        const now = new Date();
        const hour = now.getUTCHours() + timezoneOffset / 3600; // Adjust UTC hour by timezone offset

        // Determine if it's day or night based on the current hour adjusted for timezone offset
        const isDay = hour >= 6 && hour < 18;

        // Return the appropriate background style based on weather and time
        return isDay ? dayTime[weatherMain] : nightTime[weatherMain];
    };


    const animation = {
        Rain: "https://lottie.host/5eafa51a-a952-449b-a4e2-625095b0373f/5Gtwfit4gG.json",
        Clear: "https://lottie.host/ff14d40f-7962-4ff6-8179-90f0653f61f4/orsgLjt11R.json",
        Clouds: "https://lottie.host/34b26663-65b0-424c-9a86-6a27d2da7ddd/wJuHuuy5lU.json",
        Snow: "https://lottie.host/00b4eb1f-d297-4e89-a01a-18e1a68c59f8/kr8lKhDuvx.json",
        Haze: "https://lottie.host/6f7d9f26-ef38-4761-bcdc-e9dc055f40e4/Pkcenpqsb1.json",
        // Fog:{},
        // sand:{},
    };

    useEffect(() => {
        // Dynamically import the DotLottie player
        import('@dotlottie/player-component/dist/dotlottie-player.mjs');
    }, []);

    const getAnimationUrl = () => {
        const weather = data.weather && data.weather[0].main;
        return animation[weather] || null;
    };

    const animationUrl = getAnimationUrl();


    return (



        <div className='items-center mx-auto max-w-[1640px]  text-black'
             style={{...getBackgroundStyle(), backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            {loading ? (
                <div>Loading...
                    <span className="loading loading-dots loading-md"></span></div>
            ) : error ? (
                <div>
                    <div role="alert" className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                             viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{error}</span>
                    </div></div>
            ) : (
                <div className=' text-center'>
                    <h1 className='font-bold text-center text-4xl lg:text-7xl md:text-5xl'>{data.name}</h1>
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

                            <div className='grid grid-cols-1 gap-6  mx-auto border  justify-items-center '>
                                <p className='pb-5 border rounded w-[300px] glass '>Weather: {data.weather[0].main}</p>
                                <p className='pb-5 border rounded w-[300px] glass'>Humidity: {data.main.humidity}%</p>
                                <p className='pb-5 border rounded w-[300px] glass '>Wind Speed: {data.wind.speed} MPH</p>
                                <p className='pb-5 border rounded w-[300px] glass'>
                                    Feels Like: {data.main.feels_like}°C
                                </p>
                                <p className="pb-5 border rounded w-[300px] glass">Local Time: {getLocalTime(data.timezone)}</p>
                            </div>
                        </div>

                    )}
                </div>
            )}
        </div>
    );
};

export default CityTemp;

// cityTemp.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
    const { loading, data, error } = useSelector((state) => state);




    const getLocalTime = (timezoneOffset) => {
        const now = new Date();
        const utcTime = now.getTime() + now.getTimezoneOffset() * 60000; // Convert to UTC
        const localTime = new Date(utcTime + timezoneOffset * 1000); // Adjust to local time
        return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time
    };



    const dayTime = {
        Rain: { backgroundImage: `url(${rainDay})` },
        Clear: { backgroundImage: `url(${clearDay})` },
        Clouds: { backgroundImage: `url(${cloudsDay})` },
        Snow: { backgroundImage: `url(${snowDay})` },
        Haze: { backgroundImage: `url(${hazeDay})` },
    };

    const nightTime = {
        Rain: { backgroundImage: `url(${rainNight})` },
        Clear: { backgroundImage: `url(${clearNight})` },
        Clouds: { backgroundImage: `url(${cloudsNight})` },
        Snow: { backgroundImage: `url(${snowNight})` },
        Haze: { backgroundImage: `url(${hazeNight})` },
    };
    const getBackgroundStyle = () => {
        const weatherMain = data.weather && data.weather.length > 0 ? data.weather[0].main : null;

        const hour = new Date().getHours(); // Current hour in local time

        // Determine if it's day or night based on the current hour
        const isDay = hour >= 6 && hour < 18;

        // Return the appropriate background style based on weather and time
        return isDay ? dayTime[weatherMain] : nightTime[weatherMain];
    };




    const animation = {
        Rain: "https://lottie.host/5eafa51a-a952-449b-a4e2-625095b0373f/5Gtwfit4gG.json",
        Clear: "https://lottie.host/ff14d40f-7962-4ff6-8179-90f0653f61f4/orsgLjt11R.json",
        Clouds: "https://lottie.host/34b26663-65b0-424c-9a86-6a27d2da7ddd/wJuHuuy5lU.json",
        Snow: "https://lottie.host/00b4eb1f-d297-4e89-a01a-18e1a68c59f8/kr8lKhDuvx.json",
        Haze : "https://lottie.host/6f7d9f26-ef38-4761-bcdc-e9dc055f40e4/Pkcenpqsb1.json",
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
        <div className='flex justify-center mx-auto max-w-[1640px] border rounded h-screen' style={{ ...getBackgroundStyle(), backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} >
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <div className='border mx-auto text-center'>
                    {animationUrl && (
                        <dotlottie-player
                            src={animationUrl}
                            background="transparent"
                            speed="1"
                            style={{ width: 300, height: 300 }}
                            loop
                            autoplay
                        ></dotlottie-player>
                    )}
                    <h1 className='font-bold text-center text-5xl'>{data.name}</h1>
                    {data.main && (
                        <div className=''>
                            <p className='pb-5 pt-5 text-center text-7xl'>
                                {data.main.temp}°C
                            </p>
                            <p className='pb-5'>Weather: {data.weather[0].main}</p>
                            <p className='pb-5'>Humidity: {data.main.humidity}%</p>
                            <p className='pb-5'>Wind Speed: {data.wind.speed} MPH</p>
                            <p className='pb-5'>
                                Feels Like: {data.main.feels_like}°C
                            </p>
                            <p>Local Time: {getLocalTime(data.timezone)}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CityTemp;

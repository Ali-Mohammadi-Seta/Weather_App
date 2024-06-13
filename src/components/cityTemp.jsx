// cityTemp.jsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CityTemp = () => {
    const { loading, data, error } = useSelector((state) => state);

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
        <div className='flex justify-center mx-auto max-w-[1640px] border rounded'>
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
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CityTemp;

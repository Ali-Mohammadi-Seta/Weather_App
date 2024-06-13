import axios from "axios";
import {FETCH_DATA_FAILURE , FETCH_DATA_REQUEST , FETCH_DATA_SUCCESS} from "./actionTypes.jsx";

export const fetchDataRequest = () => ({
    type: FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS,
    payload: data,
});

export const fetchDataFailure = (error) => ({
    type: FETCH_DATA_FAILURE,
    payload: error,
});

export const fetchData = (location) => {
    return dispatch =>{

        dispatch(fetchDataRequest());
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&&appid=8528a0f2485fa77b6744a85922e2c69a`)
            .then(response=> {
                const data = response.data;
                dispatch(fetchDataSuccess(data));
            })
            .catch(error =>{
            const errorMSG= error.message;
            dispatch(fetchDataFailure(errorMSG))
        })

}}
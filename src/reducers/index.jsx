import {FETCH_DATA_FAILURE , FETCH_DATA_REQUEST , FETCH_DATA_SUCCESS} from '../actions/actionTypes.jsx';


const initialState = {
    loading: false,
    data: [],
    error: '',
}

const reducer = (state = initialState , action) => {

    switch (action.type){

        case FETCH_DATA_REQUEST:
            return {
                ...state , loading:true
            }
        case FETCH_DATA_SUCCESS:
            return {
                data:action.payload
                , loading:false
                , error:''
            }

        case FETCH_DATA_FAILURE:
            return {
                loading: false,
                data: [],
                error: action.payload,
            }
        default:
            return state;
    }

}



export default reducer
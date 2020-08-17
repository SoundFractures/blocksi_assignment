import {
    GET_ERRORS,
    CLEAR_ERRORS
} from './types';

export const getErrors = (response, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: {
            response,
            status,
            id
        }
    }
}
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}
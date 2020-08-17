import {
    CLEAR_ERRORS,
    GET_ERRORS
} from "./types";

const initialState = {
    response: {},
    status: null,
    id: null
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                response: action.payload.response,
                    status: action.payload.status,
                    id: action.payload.id
            };
        case CLEAR_ERRORS:
            return {
                response: {},
                    status: null,
                    id: null
            }
            default:
                return state;

    }
}
import {
    CURRENTUSERPROFILE,
    // ISERROR,
    ISUSERLOGIN,
    LOADER,
    OTPSUPPORTED,
    SPLASHSTATUSBAR
} from '../constant/constant'

export type Action = {
    type: string;
    payload: object;
}

const INITIAL_STATE = { 
    splashStatusBar: false,
 }

export default (states = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case SPLASHSTATUSBAR:
            return ({
                ...states,
                splashStatusBar: action.payload
            })
        default:
            return states;
    }
}
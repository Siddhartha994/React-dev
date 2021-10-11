import { createStore,combineReducers,applyMiddleware } from "redux";
import { createForms } from "react-redux-form";
import { Dishes } from "./dishes";
import { Comments } from "./comments";
import { Promotions } from "./promotions";
import { Leaders } from "./leaders";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { InitialFeedback } from "./forms";


export const ConfigureStore = () => {
    const store = createStore(
        // Recompose reducer functions
        combineReducers({       // reducers: ReducersMapObject         maps simpler reducer functions into properties
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback   
            })
            /*once we import the initial feedback and initialize it like this, 
            it'll add  necessary REDUCER functions and  STATE info in my CREATE STORE*/
        }),
        applyMiddleware(thunk,logger)
    );
    return store;
}
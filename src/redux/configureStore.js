import { createStore,combineReducers,applyMiddleware } from "redux";
import { Dishes } from "./dishes";
import { Comments } from "./comments";
import { Promotions } from "./promotions";
import { Leaders } from "./leaders";
import thunk from "redux-thunk";
import logger from "redux-logger";



export const ConfigureStore = () => {
    const store = createStore(
        // Recompose reducer functions
        combineReducers({       // reducers: ReducersMapObject         maps simpler reducer functions into properties
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        }),
        applyMiddleware(thunk,logger)
    );
    return store;
}
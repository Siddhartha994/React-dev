import { createStore,combineReducers } from "redux";
import { Dishes } from "./dishes";
import { Comments } from "./comments";
import { Promotions } from "./promotions";
import { Leaders } from "./leaders";

// *from prev. commit: remove initialState since every individual file storing its state

export const ConfigureStore = () => {
    const store = createStore(
        // Recompose reducer functions
        combineReducers({       // reducers: ReducersMapObject         maps simpler reducer functions into properties
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        })
    );
    return store;
}
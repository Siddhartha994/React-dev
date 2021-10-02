import {DISHES} from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

export const initialState ={
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
}
// pure function takes current state and an action and makes a copy of current state
// make immutable change
export const Reducer = (state = initialState, action) => {      //ES6 way of initializing default, when no state present initially 
    
    return state; 
};
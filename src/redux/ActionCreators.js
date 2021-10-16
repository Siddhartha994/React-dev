import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl'

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));
    // actual communication with server
    return fetch(baseUrl + 'dishes')    //providing full location of url
        //promise handler
        .then(response => { 
            if (response.ok){
                return response;
            }
            else{ 
                var error = new error('Error'+ response.status + ':' + response.statusText);
                error.response = response; 
                throw error;    // when throwing error in a promise handling, you can catch it
            }
        },
        // error handler(part of promise handler)
        error => {  
            var errmess = new Error(error.message);
            throw errmess; 
        }
        )
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));  //catches error bcoz of else or the 
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

// ------------------------ Comments ------------------------------

export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response => { 
        if (response.ok){
            return response;
        }
        else{ 
            var error = new error('Error'+ response.status + ':' + response.statusText);
            error.response = response; 
            throw error;    // when throwing error in a promise handling, you can catch it
        }
    },
    // error handler(part of promise handler)
    error => {  
        var errmess = new Error(error.message);
        throw errmess; 
    }
    )
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));  //catches error bcoz of else or the 

};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

// ---------------- Promotions -------------------------

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => { 
            if (response.ok){
                return response;
            }
            else{ 
                var error = new error('Error'+ response.status + ':' + response.statusText);
                error.response = response; 
                throw error;    // when throwing error in a promise handling, you can catch it
            }
        },
        // error handler(part of promise handler)
        error => {  
            var errmess = new Error(error.message);
            throw errmess; 
        })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));  //catches error bcoz of else or the 

}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});
import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl'

// ---------------------------comment -------------------------------------

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) =>  {    // thunk: ie. function of a function
    
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {    
        // structure of request message
        method: 'POST',
        body: JSON.stringify(newComment),  //enclosing comment(js-object) into json file
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })  
    //same error handling
    .then(  response => { 
        if (response.ok){
            return response;
        }
        else{ 
            var error = new error('Error'+ response.status + ':' + response.statusText);
            error.response = response; 
            throw error;    
        }
    },
    error => {  
        var errmess = new Error(error.message);
        throw errmess; 
    }
    )
    .then(response => response.json())  // response coming in from server will contail updated comment posted to server site,
                                        // server will include an ID into the comment before sending it

    .then(response => dispatch(addComment(response)))   // updated comment posted into redux store by dispatching
    .catch( error => {console.log('Post comments',error.message)
        alert('Your comment could not be posted /n Error: ' + error.message); })
}

// --------------------------- dishes ------------------------------------


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


//---------------------------- LEADERS --------------------------------

export const fetchLeaders = () => (dispatch) => {
    
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
        .then(response => { 
            if (response.ok){
                return response;
            }
            else{ 
                var error = new error('Error'+ response.status + ':' + response.statusText);
                error.response = response; 
                throw error;   
            }
        },
        // error handler(part of promise handler)
        error => {  
            var errmess = new Error(error.message);
            throw errmess; 
        })
    .then(response => response.json())
    .then(leaders => dispatch(addleaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));  //catches error bcoz of else or the 

}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addleaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

//  --------------------------- post feedback -------------------------------
// FEEDBACK
export const postFeedback = (feedback) => (dispatch) => {

return fetch(baseUrl + 'feedback', {
    method: "POST",
    body: JSON.stringify(feedback),
    headers: {
        "Content-Type": "application/json"
    },
    credentials: "same-origin"
})
.then(response => {
    if (response.ok) {
        return response;
    } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
    }
    },
    error => {
        throw error;
    })
.then(response => response.json())
.then(response => { console.log('Feedback', response); alert('Thank you for your feedback!\n'+JSON.stringify(response)); })
.catch(error =>  { console.log('Feedback', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
};
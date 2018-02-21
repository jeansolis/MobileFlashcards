import { RECEIVE_DECKS, ADD_DECK_TITLE } from '../actions'

function decks(state = {}, action){
    switch(action.type){
        
        case RECEIVE_DECKS:
            return action.decks
        case ADD_DECK_TITLE:
            //return state
            const deck = action.deck
            return {
                ...state,
                ...deck
            }
        default: 
            return state
    }
}

export default decks
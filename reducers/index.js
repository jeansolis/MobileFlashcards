import { RECEIVE_DECKS, ADD_DECK_TITLE, ADD_CARD } from '../actions'

function decks(state = {}, action){
    switch(action.type){
        case ADD_CARD: 
            const { deckId, question, answer } = action.card
            
            const questions = state[deckId].questions
            questions.push({question, answer})
            
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    questions
                }
            }
        
        case ADD_DECK_TITLE:
            const deck = action.deck
            return {
                ...state,
                ...deck
            }
        case RECEIVE_DECKS:
            return action.decks
        default: 
            return state
    }
}

export default decks
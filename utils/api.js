import { AsyncStorage } from 'react-native'
import { getDeckKey, formatDecks } from './helpers'

const STORAGE_KEY = 'MobileFlashCards:MainJS1'

export function getDecks(){
    return AsyncStorage.getItem(STORAGE_KEY)
    .then((decks) => decks ? JSON.parse(decks) : {})
    //.then(formatDecks)
}

export function getDeck(deckId){
    return AsyncStorage.getItem(STORAGE_KEY)
    .then((decks) => JSON.parse(decks)[deckId])
}

export function saveDeckTitle(deck){
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck))
}

export function addCardToDeck({ deckId, question, answer }){
    return AsyncStorage.getItem(STORAGE_KEY)
    .then((data) => {
        
        const decks = JSON.parse(data)
        
        decks[deckId].questions.push({
            question, 
            answer
        })

        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    })
}
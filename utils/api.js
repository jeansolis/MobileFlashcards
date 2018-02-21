import { AsyncStorage } from 'react-native'
import { getDeckKey, formatDecks } from './helpers'

const STORAGE_KEY = 'MobileFlashCards:Main'

export function getDecks(){
    return AsyncStorage.getItem(STORAGE_KEY)
    .then((decks) => decks ? JSON.parse(decks) : {})
    //.then(formatDecks)
}

export function getDeck({ key }){

}

export function saveDeckTitle(deck){
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck))
}

export function addCardToDeck(){

}
export function getDeckKey(title){
    return title.replace(/ /g,'').toLowerCase()
}

export function formatDecks(decks) {
    return Object.keys(decks).map((deck) => {
        return decks[deck]
    })
}
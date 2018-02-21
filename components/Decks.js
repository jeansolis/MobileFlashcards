import React, {Component} from 'react'
import { View, Text } from 'react-native'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import Deck from './Deck'

class Decks extends Component {

    componentDidMount() {
        //Get decks
        getDecks().then((decks) => {
            this.props.receiveDecks(decks)
        })
    }

    render() {
        const { decks } = this.props
        console.log(decks)
        return (
            <View>
                {decks.map((deck) => (
                    <Deck key={deck.title}>{deck}</Deck>
                ))}                
            </View>
        )
    }
}

function mapStateToProps(decks){
    return {
        decks: Object.keys(decks).map((deck) => {
            return decks[deck]
        })
    }
}

function mapDispatchToProps(dispatch){
    return {
        receiveDecks: (decks) => dispatch(receiveDecks(decks))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)
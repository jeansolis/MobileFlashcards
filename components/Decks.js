import React, {Component} from 'react'
import { View, Text, FlatList } from 'react-native'
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

    renderItem = ({item}) => {
        return (
            <Deck>{item}</Deck>
        )
    }

    render() {
        const { decks } = this.props
        return (
            <View>
                <FlatList data={decks} renderItem={this.renderItem} keyExtractor={(item, index) => index} />
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
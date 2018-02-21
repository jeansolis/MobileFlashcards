import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { gray } from '../utils/colors'

class DeckListItem extends Component {
    
    render() {
        console.log(this.props.children)
        const {title, questions} = this.props.children

        return (
            <View style={styles.container}>
                <Text style={styles.deckTitle}>{title}</Text>
                <Text style={styles.deckSubtitle}>{questions.length} cards</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 2,
        marginLeft: 5,
        marginRight: 5,
        paddingTop: 40,
        paddingBottom: 40
    },
    deckTitle: {
        fontSize: 40,
        textAlign: 'center'
    },
    deckSubtitle: {
        color: gray,
        fontSize: 20,
        textAlign: 'center'
    }
})

export default DeckListItem

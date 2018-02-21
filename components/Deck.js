import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Deck extends Component {
    
    render() {
        console.log(this.props.children)
        const {title, questions} = this.props.children

        return (
            <View>
                <Text>{title}</Text>
                <Text>{questions.length} cards</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    }
})

export default Deck

import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {
    
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params        

        return {
            title: title
        }
    }

    render() {
        const {deck} = this.props
        
        return (
            <View>
                <Text>{JSON.stringify(deck)}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({

})

function mapStateToProps(state, { navigation }){
    
    const {deckId} = navigation.state.params
    
    return {
        deck: state[deckId]
    }
}

export default connect(mapStateToProps)(Deck)
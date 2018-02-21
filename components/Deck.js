import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { gray, black, white } from '../utils/colors'
import { getDeckKey } from '../utils/helpers'

class Deck extends Component {
    
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params        

        return {
            title: title
        }
    }

    render() {
        const {deck, navigation} = this.props
        
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.deckTitle}>{deck.title}</Text>
                    <Text style={styles.deckSubtitle}>{deck.questions.length} cards</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.AddCardBtn} onPress={() => navigation.navigate('AddCard', {
                        deckId: getDeckKey(deck.title)
                        })} >
                        <Text style={styles.AddCardBtnText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.StartQuizBtn}>
                        <Text style={styles.StartQuizBtnText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 2,
        flex: 1,
        justifyContent: 'space-around',
        marginLeft: 5,
        marginRight: 5,
        
    },
    deckInfoContainer: {

    },
    deckButtonsContainer: {

    },
    deckTitle: {
        fontSize: 40,
        textAlign: 'center'
    },
    deckSubtitle: {
        color: gray,
        fontSize: 20,
        textAlign: 'center'
    },
    AddCardBtn: {
        backgroundColor: white,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 50,
        paddingBottom: 20,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20
    },
    AddCardBtnText: {
        color: black,
        fontSize: 24,
        textAlign: 'center'
    },
    StartQuizBtn: {
        backgroundColor: black,
        borderRadius: 8,
        marginLeft: 50,
        marginRight: 50,
        paddingBottom: 20,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20
    },
    StartQuizBtnText: {
        color: white,
        fontSize: 24,
        textAlign: 'center'
    }
})

function mapStateToProps(state, { navigation }){
    
    const {deckId} = navigation.state.params
    
    return {
        deck: state[deckId]
    }
}

export default connect(mapStateToProps)(Deck)
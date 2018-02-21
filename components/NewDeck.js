import React, {Component} from 'react'
import { 
    KeyboardAvoidingView, 
    Text, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity } from 'react-native'
import { black, white } from '../utils/colors'
import { saveDeckTitle, getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { addDeckTitle } from '../actions'
import { getDeckKey } from '../utils/helpers'

class NewDeck extends Component {

    state = {
        title: ''
    }  

    handleTitleChange = (title) => {
        this.setState({ title })
    }

    submitDeck = () => {
        const { title } = this.state
        const { navigation } = this.props

        //Build deck
        const newDeck = {
            [getDeckKey(title)]: {
                title, 
                questions: []
            }
        }

        //Save Deck into DB
        saveDeckTitle(newDeck).then(() => {
            
            //Clean input field
            this.setState({
                title: ''
            })

            //Update Redux store
            this.props.addDeckTitle(newDeck)

            //Navigate to Deck View
            navigation.navigate('Deck', {deckId: getDeckKey(title)})
        })
        .catch((err) => {
            console.log(err)
        })
        
    }

    render() {
        const {title} = this.state
        
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.titleLabel}>What is the title of your new deck?</Text>
                <TextInput style={styles.titleInput} value={title} onChangeText={this.handleTitleChange} placeholder="Deck Title" maxLength={30}></TextInput>
                <TouchableOpacity style={styles.submitBtn} disabled={title.length == 0} onPress={this.submitDeck}>
                    <Text style={styles.submitBtnText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        //marginTop: 50,
        paddingLeft: 20,
        paddingRight: 20
    },
    titleLabel: {
        fontSize: 42,
        marginBottom: 40,
        textAlign: 'center'
    },
    titleInput: {
        borderRadius: 8,
        borderWidth: 1,
        fontSize: 18,
        height: 50,
        marginBottom: 50,
        padding: 6, 
        width: '100%'
    },
    submitBtn: {
        backgroundColor: black,
        borderRadius: 8,
        paddingBottom: 20,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20
    },
    submitBtnText: {
        color: white,
        fontSize: 24
    }
})

function mapStateToProps(state){
    return {
    }
}

function mapDispatchToProps(dispatch){
    return {
        addDeckTitle: (deck) => dispatch(addDeckTitle(deck))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)

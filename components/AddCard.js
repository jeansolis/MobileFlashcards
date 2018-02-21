import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { black, white } from '../utils/colors'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'
import { connect } from 'react-redux'

class AddCard extends Component {    

    state = {
        question: '',
        answer: ''
    }

    handleQuestionText = (question) => {
        this.setState({
            question
        })
    }

    handleAnswerText = (answer) => {
        this.setState({
            answer
        })
    }

    submitCard = () => {
        const { question, answer } = this.state
        const { addCard } = this.props
        const { deckId } = this.props.navigation.state.params
        
        // Build Card 
        const card = {
            deckId,
            question,
            answer
        }

        // Save card into DB
        addCardToDeck(card).then(() => {

            //Clean input fields
            this.setState({
                question: '',
                answer: ''
            })

            //Update Redux store
            addCard(card)
        })

    }

    render(){
        const { question, answer } = this.state
        const { deckId } = this.props.navigation.state.params
        
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TextInput style={styles.input} value={question} onChangeText={this.handleQuestionText} placeholder="Type a question..." maxLength={200} />
                <TextInput style={styles.input} value={answer} onChangeText={this.handleAnswerText} placeholder="Type the answer..." maxLength={200} />
                <TouchableOpacity style={styles.submitBtn} disabled={question.length == 0 || answer.length == 0} onPress={this.submitCard}>
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
        // justifyContent: 'center',
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20
    },
    input: {
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
        addCard: (card) => dispatch(addCard(card))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
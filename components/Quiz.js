import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import {} from '../utils/colors'
import { connect } from 'react-redux'

class Quiz extends Component {
    
    state = {
        viewMode: 'q', //q (question) or a (answer),
        correctQuantity: 0
    }

    toggleViewMode = () => {
        this.setState((prevState) => ({
            viewMode: prevState.viewMode == 'q' ? 'a' : 'q'
        }))
    }

    componentDidMount() {
        const { deck } = this.props
        //Set first question
        this.setState({
            currentQuestion: deck.questions[0],
            currentIndex: 0,
            totalQuestions: deck.questions.length
        })
    }

    setAnswer = (correct) => {
        const { deck } = this.props
        this.setState((prevState) => ({
                currentQuestion: prevState.currentIndex < prevState.totalQuestions ? deck.questions[prevState.currentIndex + 1] : null,
                currentIndex: prevState.currentIndex < prevState.totalQuestions ? prevState.currentIndex + 1 : prevState.currentIndex,
                correctQuantity: correct ? prevState.correctQuantity + 1 : prevState.correctQuantity
        }))
    }

    restart = () => {
        const { deck } = this.props
        this.setState({
            currentQuestion: deck.questions[0],
            currentIndex: 0,
            viewMode: 'q',
            correctQuantity: 0
        })
    }

    render() {
        const { deck, navigation } = this.props
        const { viewMode, currentQuestion, currentIndex, totalQuestions, correctQuantity } = this.state

        return (
            <View>
                {currentQuestion ?
                <View>
                    <Text style={styles.pager}>{currentIndex + 1} / {totalQuestions}</Text>
                    <Text style={styles.qaLabel}>
                        {viewMode === 'q' ?
                        currentQuestion.question
                        :
                        currentQuestion.answer
                        }
                    </Text>
                    <TouchableOpacity onPress={this.toggleViewMode}>
                        <Text>
                            {viewMode === 'q' ?
                            'Answer'
                            :
                            'Question'
                            }
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setAnswer(true)}>
                        <Text>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setAnswer(false)}>
                        <Text>Incorrect</Text>
                    </TouchableOpacity>
                </View>
                :
                <View>
                    <Text>Your final score is {(correctQuantity / totalQuestions * 100).toFixed(2)}%</Text>
                    <Text>{correctQuantity < totalQuestions ? correctQuantity : 'All'} question{correctQuantity !== 1 ? 's': ''} answered correctly.</Text>
                    <TouchableOpacity onPress={this.restart}>
                        <Text>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack() }>
                        <Text>Back to Deck</Text>
                    </TouchableOpacity>
                </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    pagerLabel: {

    },
    qaLabel: {

    }
})

function mapStateToProps(state, { navigation }){
    const { deckId } = navigation.state.params

    return {
        deck: state[deckId]
    }
}

export default connect(mapStateToProps)(Quiz)
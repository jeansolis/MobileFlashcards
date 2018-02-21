import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { white, black, red, green, blue } from '../utils/colors'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {
    
    state = {
        viewMode: 'q', //q (question) or a (answer),
        correctQuantity: 0
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

    toggleViewMode = () => {
        this.setState((prevState) => ({
            viewMode: prevState.viewMode == 'q' ? 'a' : 'q'
        }))
    }

    setAnswer = (correct) => {
        const { deck } = this.props
        
        //If this is the last question (quiz completed), reset Local Notification for tomorrow
        if(this.state.currentIndex + 1 === this.state.totalQuestions ){
            clearLocalNotification()
            .then(setLocalNotification)
        }

        this.setState((prevState) => ({
                currentQuestion: prevState.currentIndex < prevState.totalQuestions ? deck.questions[prevState.currentIndex + 1] : null,
                currentIndex: prevState.currentIndex < prevState.totalQuestions ? prevState.currentIndex + 1 : prevState.currentIndex,
                correctQuantity: correct ? prevState.correctQuantity + 1 : prevState.correctQuantity,
                viewMode: 'q',
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
            <View style={styles.container}>
                {currentQuestion ?
                <View style={styles.container}>
                    <View style={styles.pagerLabelContainer}>
                        <Text style={styles.pagerLabel}>{currentIndex + 1} / {totalQuestions}</Text>
                    </View>
                    <View style={styles.qaLabelContainer}>
                        <ScrollView>
                            <Text style={styles.qaLabel}>
                                {viewMode === 'q' ?
                                currentQuestion.question
                                :
                                currentQuestion.answer
                                }
                            </Text>
                            <TouchableOpacity onPress={this.toggleViewMode}>
                                <Text style={styles.viewModeChoiceLabel}>
                                    {viewMode === 'q' ?
                                    'Answer'
                                    :
                                    'Question'
                                    }
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.CorrectBtn} onPress={() => this.setAnswer(true)}>
                            <Text style={styles.CorrectBtnText}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.IncorrectBtn} onPress={() => this.setAnswer(false)}>
                            <Text style={styles.IncorrectBtnText}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :
                <View style={styles.container}>
                    <View style={styles.scoreContainer}>
                        <Text style={styles.scorePercentageLabel}>
                            Your final score is {(correctQuantity / totalQuestions * 100).toFixed(0)}%
                        </Text>
                        <Text style={styles.scoreCorrectQuantityLabel}>
                            {correctQuantity < totalQuestions ? correctQuantity : 'All'} question{correctQuantity !== 1 || totalQuestions == 1 ? 's': ''} answered correctly.
                        </Text>
                    </View>
                    <View style={styles.scoreButtonsContainer}>
                        <TouchableOpacity style={styles.RestartQuizBtn} onPress={this.restart}>
                            <Text style={styles.RestartQuizBtnText}>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.GoBackToDeckBtn} onPress={() => navigation.goBack() }>
                            <Text style={styles.GoBackToDeckBtnText}>Back to Deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pagerLabelContainer: {
        flex: 1
    },
    pagerLabel: {
        marginTop: 5,
        marginLeft: 5,
        fontSize: 20
    },
    qaLabelContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 5,
        paddingLeft: 5,
        paddingRight: 5
    },
    qaLabel: {
        fontSize: 42,
        textAlign: 'center',
    },
    viewModeChoiceLabel: {
        color: red,
        fontSize: 20,
        alignSelf: 'center'
    },
    buttonsContainer: {
        flex: 4                
    },
    CorrectBtn: {
        backgroundColor: green,
        borderRadius: 8,
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 50,
        paddingBottom: 20,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20
    },
    CorrectBtnText: {
        color: white,
        fontSize: 24,
        textAlign: 'center'
    },
    IncorrectBtn: {
        backgroundColor: red,
        borderRadius: 8,
        marginLeft: 50,
        marginRight: 50,
        paddingBottom: 20,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20
    },
    IncorrectBtnText: {
        color: white,
        fontSize: 24,
        textAlign: 'center'
    },
    scoreContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5
    },
    scorePercentageLabel: {
        fontSize: 28
    },
    scoreCorrectQuantityLabel: {
        fontSize: 18,
        color: blue
    },
    scoreButtonsContainer: {
        flex: 2
    },  
    RestartQuizBtn: {
        backgroundColor: white,
        borderRadius: 8,
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 50,
        paddingBottom: 20,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20
    },
    RestartQuizBtnText: {
        color: black,
        fontSize: 24,
        textAlign: 'center'
    },
    GoBackToDeckBtn: {
        backgroundColor: black,
        borderRadius: 8,
        marginLeft: 50,
        marginRight: 50,
        paddingBottom: 20,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20
    },
    GoBackToDeckBtnText: {
        color: white,
        fontSize: 24,
        textAlign: 'center'
    }
})

function mapStateToProps(state, { navigation }){
    const { deckId } = navigation.state.params

    return {
        deck: state[deckId]
    }
}

export default connect(mapStateToProps)(Quiz)
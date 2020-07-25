import React, {Component} from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

export default class Quiz extends Component {

    state = {
        results: {}, //{[id]: success, error}
        answerState: null,
        activeQuestion: 0,
        isFinished: false,
        quiz: [
            {
                id: 1,
                question: 'Какого цвета небо',
                rightAnswerId: 2,
                answers: [
                    {text: 'Черный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зеленый', id: 4},
                ]
            },
            {
                id: 2,
                question: 'Столица Германии',
                rightAnswerId: 3,
                answers: [
                    {text: 'Гамбург', id: 1},
                    {text: 'Ганновер', id: 2},
                    {text: 'Берлин', id: 3},
                    {text: 'Мюнхен', id: 4},
                ]
            }
        ]
    };

    render() {
        const state = this.state;

        const onAnswerClickHandler = answerId => {
            console.log(`Answer id : ${answerId}`);

            const question = state.quiz[state.activeQuestion];
            const results = state.results;

            if (question.rightAnswerId === answerId) {
                if (!results[question.id]) {
                    results[question.id] = 'success';
                }

                this.setState({
                    answerState: {[answerId]: 'success'},
                    results
                });

                const timeOut = window.setTimeout(() => {
                    if (isQuizFinished()) {
                        this.setState({
                            isFinished: true
                        })
                    } else {
                        this.setState({
                            activeQuestion: state.activeQuestion + 1,
                            answerState: null
                        });
                    }
                    window.clearTimeout(timeOut);
                }, 1000);
            } else {
                results[question.id] = 'error';
                this.setState({
                    answerState: {[answerId]: 'error'},
                    results
                });
            }
        };

        const isQuizFinished = () => {
            return state.activeQuestion + 1 === state.quiz.length;
        };

        const retryHandler = () => {
            this.setState({
                isFinished: false,
                results: {},
                activeQuestion: 0,
                answerState: null
            })
        };

        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        state.isFinished
                            ? <FinishedQuiz
                                results={state.results}
                                quiz={state.quiz}
                                onRetry={retryHandler}
                            />
                            : <ActiveQuiz
                                answers={state.quiz[state.activeQuestion].answers}
                                question={state.quiz[state.activeQuestion].question}
                                onAnswerClick={onAnswerClickHandler}
                                quizLength={state.quiz.length}
                                answerNumber={state.activeQuestion + 1}
                                answerState={state.answerState}
                            />
                    }
                </div>
            </div>
        );
    }
}
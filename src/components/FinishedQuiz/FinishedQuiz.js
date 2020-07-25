import React from 'react';
import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button';
import {Link} from 'react-router-dom';

const FinishedQuiz = props => {

    const countSuccess = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success' ){
            total++;
        }
        return total;
    }, 0);

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {
                    props.quiz.map((QuizItem, index) => {
                        const cls = [
                            'fa',
                            props.results[QuizItem.id] === 'error'? 'fa-times': 'fa-check',
                            classes[props.results[QuizItem.id]]
                        ];
                        return (
                            <li key={index}>
                                <strong>{index + 1}</strong>.&nbsp;
                                {QuizItem.question}
                                <i className={cls.join(' ')}/>
                            </li>
                        )
                    })
                }
            </ul>
            <p>
                Правильно {countSuccess} из {props.quiz.length}
            </p>
                <Button onClick={props.onRetry} type='primary'>Повторить</Button>
                <Link to={'/'}>
                    <Button onClick={props.onRetry} type='success'>Перейти в список тестов</Button>
                </Link>
            </div>
    )
};

export default FinishedQuiz;
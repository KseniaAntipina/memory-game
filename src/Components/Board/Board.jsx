import React, {useEffect, useState} from 'react'
import Card from "../Card/Card";
import styles from './board.module.css'
import data from './../../data/data'
import back from './../../images/back.jpg'

const Board = () => {

    const [deck, setDeck] = useState([]);
    const [activeCards, setActiveCards] = useState([]);
    const [foundPairs, setFoundPairs] = useState([]);

    const createBoard = () => {
        setDeck(data.reduce(function (res, current) {
            return res.concat([current, current]);
        }, [])
            .sort(() => Math.random() - 0.5))
    }

    useEffect(() => {
        createBoard()
    }, [])

    const restart = () => {
        setActiveCards([])
        setFoundPairs([])
        createBoard()
    }

    const flipCard = (index) => {
        if (activeCards.length === 0) {
            setActiveCards([index])
        }

        if (activeCards.length === 1) {

            const firstIndex = activeCards[0];
            const secondsIndex = index;

            if (activeCards.indexOf(index) === -1) {

                setActiveCards([...activeCards, index]);

                if (deck[firstIndex].name === deck[secondsIndex].name && foundPairs.indexOf(index) === -1) {
                    setFoundPairs([...foundPairs, firstIndex, secondsIndex])
                    setActiveCards([])
                }
            }

            setTimeout(() => {
                setActiveCards([]);
            }, 900)

        }
    }

    function flippedToFront(index) {
        return (activeCards.indexOf(index) !== -1) || foundPairs.indexOf(index) !== -1;
    }

    return (
        <div>
            <h1>Memory game</h1>
            <p>open cards <b>{foundPairs.length} of {deck.length}</b></p>
            <button onClick={() => restart()} className={styles.btn}>start over</button>
            <div className={styles.cards}>
                {
                    deck.map((card, index) => {

                            const pictureSrc = flippedToFront(index) ? card.picture : back
                            const name = card.name

                            return (
                                <Card flipCard={flipCard}
                                      pictureSrc={pictureSrc}
                                      flippedToFront={flippedToFront}
                                      index={index}
                                      name={name}
                                      key={index}
                                />
                            )
                        }
                    )}
            </div>
        </div>
    )
}

export default Board


import React from 'react'
import styles from './Card.module.css'

const Card = ({flipCard,pictureSrc,flippedToFront,index}) => {

    return (

        <div>
            {
                flippedToFront(index) ?
                    <div className={`${styles.card}`}>
                        <img src={pictureSrc} alt="card"
                             className={styles.front}
                        />
                    </div>
               :
                    <div className={`${styles.card} ${styles.flipped} `}
                         onClick={() => flipCard(index)}>
                        <img src={pictureSrc} alt="card"
                             className={styles.back}
                        />
                    </div>
            }
        </div>
    )
}


export default Card
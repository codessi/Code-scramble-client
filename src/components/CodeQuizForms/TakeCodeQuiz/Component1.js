import React, { useState, useEffect } from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import CardT from './CardT'
const update = require('immutability-helper')

function Component1 (props) {
  const [text, setText] = useState({ cards: null })

  const moveCard = (dragIndex, hoverIndex) => {
    const { cards } = text
    const dragCard = cards[dragIndex]
    setText(
      update(text, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    )
  }

  useEffect(() => {
    const textArray = props.text.split('\n')
    const cards = []
    for (let i = 1; i < textArray.length; i++) {
      const card = { id: i, text: textArray[i] }
      cards.push(card)
    }
    // const newObj = Object.assign({ line: null }, [textArray])
    setText({ cards: cards })
    // {}
    console.log('cards is ' + cards)
    console.log('text is ' + text)
  }, [])

  return (
    <div>
      hello
      {console.log('text now is' + JSON.stringify(text))}
      {text.cards && text.cards.map((card, index) =>
        (<CardT
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />))}
      {/* {props.text} */}
    </div>
  )
}

export default DragDropContext(HTML5Backend)(Component1)

// export default Component1

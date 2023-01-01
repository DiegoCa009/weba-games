import _ from 'underscore';
import React, { useState, useEffect } from 'react';
import './style.css';
import { build } from './helpers/buildCards';
import { loses, match, state } from './helpers/sounds';


//Separar funciones

export default function App() {
  const [couples, setCouples] = useState([null, null]);
  const [clicks, setClicks] = useState({ count: 0, disabled: false });
  const [cardsTable, setCards] = useState([]);
  const [table_css, setTable_css] = useState({});
  
  useEffect(()=>{ 
    
    const {TABLE_STYLE, cards}= build('princess',4,4);
    setTable_css(TABLE_STYLE)
    setCards(cards);
    setClicks({ count: 0, disabled: false });
    setCouples([null, null]);
  },[])
  
  

  const show_img = {
    backgroundColor: '',
    filter: 'none',
}
  
const hidde_img = {
  backgroundColor: 'black',
  filter: 'contrast(0)',
}
 
  

  const resetGame = () => {
    state.play()
    const {TABLE_STYLE, cards}= build('princess',4,4);
    setTable_css(TABLE_STYLE)
    setCards(cards);
    setClicks({ count: 0, disabled: false });
    setCouples([null, null]);
  };

  const mostrar = (obj, index) => {
    if (clicks.disabled) return;
    const { name, value } = obj;
    cardsTable[index].ctrl = false;
    cardsTable[index].style = show_img;
    setCards((cardsTable) => [...cardsTable]);
    couples[clicks.count] = { name, value, index };

    clicks.count++;
    if (clicks.count === 2) {
      clicks.disabled = !clicks.disabled;
      clicks.count = 0;
      if (
        couples[0].name === couples[1].name &&
        couples[0].value != couples[1].value
      ) {
        match.play()
        const { index: uno } = couples[0];
        const { index: dos } = couples[1];

        setTimeout(() => {
          cardsTable[uno].ctrl = false;
          cardsTable[dos].ctrl = false;
          setCards((cardsTable) => [...cardsTable]);
          clicks.disabled = !clicks.disabled;
        }, 1000);
      } else {
        loses.play()
        const { index: uno } = couples[0];
        const { index: dos } = couples[1];
        setTimeout(() => {
          cardsTable[uno].ctrl = true;
          cardsTable[dos].ctrl = true;
          cardsTable[uno].style = hidde_img;
          cardsTable[dos].style = hidde_img;
          setCards((cardsTable) => [...cardsTable]);
          clicks.disabled = !clicks.disabled;
        }, 500);
      }
    }
  };

  return (
    <div>
      <h3>Memorama</h3> 
      <div className="cards-container" style={{ ...table_css }}>
        {cardsTable.map((obj, i) => (
          <img
            src={obj.name}
            onClick={obj.ctrl ? (e) => mostrar(obj, i) : null}
            style={{ ...obj.style }}
            key={i}
          />
            
        ))}
        
      </div>

      <button onClick={resetGame}>Reiniciar</button>
    </div>
  );
}

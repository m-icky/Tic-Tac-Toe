import React, { useState, useEffect } from 'react';
import './TickTack.css';
import CrossIcon from '../Assets/cross.png';
import CircleIcon from '../Assets/circle.png';
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export const TicTack = () => {
  const [data, setData] = useState(Array(9).fill(''));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState('');
  const [winningCombo, setWinningCombo] = useState([]);
  const [hoverColor, setHoverColor] = useState(false);
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [showDialog, setShowDialog] = useState(true);
  const { width, height } = useWindowSize();

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (newData) => {
    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (
        newData[a] &&
        newData[a] === newData[b] &&
        newData[a] === newData[c]
      ) {
        setWinner(newData[a]);
        setWinningCombo([a, b, c]);
        setLock(true);
        return;
      }
    }

    if (!newData.includes('')) {
      setWinner('draw');
      setLock(true);
    }
  };

  const toggle = (index) => {
    if (lock || data[index] !== '') return;

    const newData = [...data];
    newData[index] = count % 2 === 0 ? 'x' : 'o';
    setData(newData);
    setCount(count + 1);
    checkWinner(newData);
    setHoverColor(!hoverColor);
  };

  const resetGame = () => {
    setData(Array(9).fill(''));
    setCount(0);
    setLock(false);
    setWinner('');
    setWinningCombo([]);
    setHoverColor(false);
  };

  const renderIcon = (value) => {
    if (value === 'x') return <img src={CrossIcon} className='tack-img' alt="X" />;
    if (value === 'o') return <img src={CircleIcon} className='tack-img' alt="O" />;
    return null;
  };

  const getTitle = () => {
    if (winner === 'x') return `${playerX} Wins!`;
    if (winner === 'o') return `${playerO} Wins!`;
    if (winner === 'draw') return 'It\'s a Draw!';
    return 'Tic Tac Toe';
  };

  const handleStart = () => {
    if (playerX && playerO) {
      setShowDialog(false);
    }
  };

  return (
    <div className="container">
      {(winner === 'x' || winner === 'o') && (
        <Confetti width={width} height={height} />
      )}
      <h1 className="title">{getTitle()}</h1>

      {/* Game Board */}
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div className={`row${row + 1}`} key={row}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <div
                  className={`boxes 
                    ${data[index] === 'x' ? 'x-border' : ''} 
                    ${data[index] === 'o' ? 'o-border' : ''} 
                    ${hoverColor ? "hovered" : ""}
                    ${winningCombo.includes(index) ? 'highlight' : ''}`}
                  key={index}
                  onClick={() => toggle(index)}
                >
                  {renderIcon(data[index])}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <button className="reset" onClick={resetGame}>
        Reset
      </button>

      {/* PrimeReact Dialog */}
      <Dialog
        header="Enter Player Names"
        visible={showDialog}
        closable={false}
        modal
        style={{ width: '50vw' }}
        className='user-dialog'
      >
        <div className="p-fluid">
          <div className="field">
            <label htmlFor="playerX">Player X</label>
            <InputText id="playerX" value={playerX} onChange={(e) => setPlayerX(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="playerO">Player O</label>
            <InputText id="playerO" value={playerO} onChange={(e) => setPlayerO(e.target.value)} />
          </div>
          <Button label="Start Game" onClick={handleStart} disabled={!playerX || !playerO} className="start" />
        </div>
      </Dialog>
    </div>
  );
};

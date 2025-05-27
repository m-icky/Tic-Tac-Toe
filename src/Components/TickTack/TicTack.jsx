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
  const [playWithComputer, setPlayWithComputer] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');

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
    if (winner === 'o') return `${playerO || 'Computer'} Wins!`;
    if (winner === 'draw') return 'It\'s a Draw!';
  };

  const handleStart = () => {
    if (playerX && playerO) {
      setShowDialog(false);
    }
  };

  const makeComputerMove = () => {
    let move;
  
    if (difficulty === 'easy') {
      const emptyIndices = data.map((val, idx) => (val === '' ? idx : null)).filter((val) => val !== null);
      move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    } else {
      move = getBestMove(data);
    }
  
    if (move == null) return;
  
    const newData = [...data];
    newData[move] = 'o';
    setData(newData);
    setCount((prev) => prev + 1);
    checkWinner(newData);
    setHoverColor((prev) => !prev);
  };
  
  

  useEffect(() => {
    if (playWithComputer && count % 2 === 1 && !lock) {
      const timeout = setTimeout(() => {
        makeComputerMove();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [count, data, playWithComputer, lock]);
  
  const getBestMove = (board) => {
    let bestScore = -Infinity;
    let move = null;
  
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'o'; // Computer is 'o'
        let score = minimax(board, 0, false);
        board[i] = '';
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
  
    return move;
  };
  
  const minimax = (board, depth, isMaximizing) => {
    const winner = checkWinnerForMinimax(board);
    if (winner !== null) {
      const scores = { x: -1, o: 1, draw: 0 };
      return scores[winner];
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = 'o';
          const score = minimax(board, depth + 1, false);
          board[i] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = 'x';
          const score = minimax(board, depth + 1, true);
          board[i] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };
  
  const checkWinnerForMinimax = (board) => {
    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
  
    if (!board.includes('')) return 'draw';
  
    return null;
  };
  

  return (
    <div className="container">
      {(winner === 'x' || winner === 'o') && (
        <Confetti width={width} height={height} />
      )}
      <h1 className="title">Tic Tac Toe</h1>
      <span className="title">{getTitle()}</span>

      <div className="board-container">
        <div className="user-one">
          <span className="user-name">{playerX || 'Player One'}</span>
        </div>
        <div className="user-two">
          <span className="user-name">{playWithComputer ? 'Computer' : playerO || 'Player Two'}</span>
        </div>
      </div>
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
            <label htmlFor="playerX">Player One</label>
            <InputText id="playerX" value={playerX} onChange={(e) => setPlayerX(e.target.value)} />
          </div>
          {!playWithComputer && (
            <div className="field">
              <label htmlFor="playerO">Player Two</label>
              <InputText id="playerO" value={playerO} onChange={(e) => setPlayerO(e.target.value)} />
            </div>
          )}
          <div className="field-checkbox">
            <input
              type="checkbox"
              id="playWithComputer"
              checked={playWithComputer}
              onChange={(e) => {
                setPlayWithComputer(e.target.checked);
                if (e.target.checked) setPlayerO('Computer');
                else setPlayerO('');
              }}
            />
            <label htmlFor="playWithComputer">Play with Computer</label>
          </div>

          {playWithComputer && (
            <div className="field">
              <label htmlFor="difficulty">Difficulty</label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="p-inputtext"
              >
                <option value="easy">Easy</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          )}
          <Button
            label="Start Game"
            onClick={handleStart}
            disabled={!playerX || (!playWithComputer && !playerO)}
            className="start"
          />
        </div>
      </Dialog>
    </div>
  );
};

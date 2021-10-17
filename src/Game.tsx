import { Board } from "./Board";
import React from 'react';
import { History } from "./History";
export { Game };

interface GameProps {
    squares: Array<string>;
}
export interface BoardState {
    squares: Array<string>;
    currentIndex?: number;
}
interface GameState {
    history: Array<BoardState>;
    stepNumber: number;
    xIsNext: boolean;
}
const MOVEMENT_X = 'X';
const MOVEMENT_O = 'O';

class Game extends React.Component {
    state: GameState;

    constructor(props: GameProps) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                currentIndex: undefined,
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    render(): React.ReactElement {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const currentIndex = current.currentIndex;
        const winnerLine = calculateWinnerLine(current.squares);

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(index) => this.handleClick(index)}
                        lastMoveIndex = {currentIndex}
                        winnerLineIndices = {winnerLine}
                    />
                </div>
                <div className="game-info">
                    <div>{this.checkGameStatus(winnerLine, calculateMovementsLeft(current))}</div>
                    <History history={history} jumpTo={(step: number) => this.jumpTo(step)}/>
                </div>
            </div>
        );
    }

    private checkGameStatus(winnerLine: Array<number> | undefined, movementsLeft: number) {
        if (winnerLine) {
            return 'Winner: ' + winnerLine[0];
        } 
        if (movementsLeft <= 0) {
            return 'Draw';
        }
        return 'Next player: ' + (this.state.xIsNext ? MOVEMENT_X : MOVEMENT_O);
    }

    jumpTo(step: number): void {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleClick(index: number): void {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinnerLine(squares) || squares[index]) {
            return;
        }
        squares[index] = this.state.xIsNext ? MOVEMENT_X : MOVEMENT_O;
        this.setState({
            history: history.concat([{
                squares: squares,
                currentIndex: index,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
}

function calculateMovementsLeft(boardState: BoardState): number {
    const constSquaresFilled = boardState.squares.filter(content => content === MOVEMENT_X || content === MOVEMENT_O);
    return 9 - constSquaresFilled.length;
}

function calculateWinnerLine(squares: Array<string>): Array<number> | undefined {
    const possibleLinesToWin = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < possibleLinesToWin.length; i++) {
        const [position1, position2, position3] = possibleLinesToWin[i];
        if (squares[position1] && squares[position1] === squares[position2] && squares[position1] === squares[position3]) {
            return [position1, position2, position3];
        }
    }
    return undefined;
}
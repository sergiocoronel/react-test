import React from 'react';
import { Square } from '.';
export { Board }

interface BoardProps {
    squares: Array<string>;
    onClick: (index: number) => void;
    winnerLineIndices?: Array<number>;
    lastMoveIndex?: number;
}

class Board extends React.Component<BoardProps> {

    constructor(props: BoardProps) {
        super(props);
    }

    renderSquare(index: number): React.ReactElement {
        return <Square value={this.props.squares[index]} 
        onClick={() => this.props.onClick(index)} 
        currentIndex={this.checkIfCurrentIndex(this.props.lastMoveIndex, index)} 
        winnerIndex={this.checkIfWinnerIndex(this.props.winnerLineIndices, index)}/>;
    }

    render(): React.ReactElement {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }

    private checkIfCurrentIndex(lastMoveIndex: number | undefined, renderIndex: number) : boolean {
        if (lastMoveIndex && lastMoveIndex === renderIndex){
            return true;
        }
        return false;
    }

    private checkIfWinnerIndex(winnerLineIndices: Array<number> | undefined, renderIndex: number) : boolean {
        if (winnerLineIndices && winnerLineIndices.includes(renderIndex)){
            return true;
        }
        return false;
    }
}


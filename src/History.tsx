import React from 'react';
import { BoardState } from './Game';
export { History }

interface HistoryProps {
    history: Array<BoardState>;
    jumpTo: (move:number) => void;
}
interface HistoryState {
    ascendentOrder: boolean;
}

class History extends React.Component<HistoryProps> {
    state: HistoryState;

    constructor(props: HistoryProps) {
        super(props);
        this.state = {
            ascendentOrder: true,
        };
    }

    render(): React.ReactElement {
        return (
            <div>
                <div className="subtitle-text">History <button onClick={() => this.changeOrder()}>Order</button></div>
                <ol>{this.generateHistoryViewComponent(this.props.history, this.props.jumpTo)}</ol>
            </div>
        );
    }

    changeOrder(): void {
        this.setState({
            ascendentOrder: !this.state.ascendentOrder,
        });
    }

    generateHistoryViewComponent(history: Array<BoardState>, jumpTo: (move:number) => void): Array<React.ReactElement> {        
        const botonesHistorial = history.map((step, move) => {
            const description = move ?
                'Go to move #' + move + " => " + this.mapIndexToBoardPosition(step.currentIndex):
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{description}</button>
                </li>
            );
        });
        if (this.state.ascendentOrder === false){
            return botonesHistorial.reverse();
        } else {
            return botonesHistorial;
        }
    }

    mapIndexToBoardPosition(index: number | undefined): string {
        switch (index) {
            case 0:
                return '[1,1]';
            case 1:
                return '[1,2]';
            case 2:
                return '[1,3]';
            case 3:
                return '[2,1]';
            case 4:
                return '[2,2]';
            case 5:
                return '[2,3]';
            case 6:
                return '[3,1]';
            case 7:
                return '[3,2]';    
            case 8:
                return '[3,3]';
            default:
                return 'undefined';
        }
    }

}


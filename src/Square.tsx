import React from 'react';
export { Square }

interface SquareProps {
    value?: string;
    onClick: () => void;
    winnerIndex: boolean;
    currentIndex: boolean;
}

function Square(props: SquareProps): React.ReactElement {
    const className = "square " + formatIndex(props.winnerIndex, props.currentIndex);
    return (
        <button className={className} onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

function formatIndex(winnerIndex: boolean, currentIndex: boolean): string {
    if (winnerIndex){
        return 'winner-square';
    }
    if (currentIndex){
        return 'current-square';
    }
    return '';
}

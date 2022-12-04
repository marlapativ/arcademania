
const TicTacToe: React.FC = () => {
    const initialHistory: History[] = [
        {
            squares: Array(9).fill(null)
        }
    ];

    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [stepNumber, setStepNumber] = useState<number>(0);
    const [history, setHistory] = useState<History[]>(initialHistory);
    const [showPlayerSelection, setShowPlayerSelection] = useState(true);

    const handleClick = (i: number): void => {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? "X" : "O";
        setHistory(newHistory.concat([
            {
                squares: squares
            }
        ]));
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
        setShowPlayerSelection(false);
    }

    const jumpTo = (step: number): void => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }


export default TicTacToe;
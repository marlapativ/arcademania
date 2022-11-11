import { useRouter } from 'next/router'
import Partition from '../../lib/components/common/Partition'
import { Minesweeper } from '../../lib/components/game'
import Leaderboard from '../../lib/components/leaderboard/Leaderboard'
import { GameInfo } from '../../lib/types/globals'

const GamePage = () => {
    const router = useRouter()
    const { gameid } = router.query
    const id = gameid as string;
    return (
        <>
            <Partition direction='left'>
                <Game id={id} />
            </Partition>
            <Partition direction='right'>
                <Leaderboard />
            </Partition>
        </>
    )
}

const Game: React.FC<GameInfo> = ({ id }) => {
    return (
        <>
            {id == '1' ? <Minesweeper rows={8} columns={8} bombs={10}></Minesweeper> : null}
        </>
    )
}

export default GamePage;
import { useRouter } from 'next/router'
import GameDashboard from '../../lib/components/common/GameDashboard'

const GamePage = () => {
    const router = useRouter()
    const { gameid } = router.query
    const id = gameid as string;
    return (
        <GameDashboard id={id}/>
    )
}

export default GamePage;
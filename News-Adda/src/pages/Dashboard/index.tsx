import { useEffect } from "react"
import Appbar from "../../Components/Appbar"
import LiveGames from "../../Components/LiveGames"

const Dashboard = () => {
    useEffect(() => {
        const token = localStorage.getItem("userData")
        console.log("token", token)
    }, [])
    return (
        <div className="h-screen w-screen">
            <Appbar />
            <div className="">
                <LiveGames />
            </div>
        </div>
    )
}

export default Dashboard

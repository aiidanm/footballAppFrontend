import React, { useEffect, useState } from "react";
import {useAuth} from "../../../contexts/userContext"
import { useNavigate } from "react-router-dom";
import Header from "../header"
import {getLeagueCode} from "../../../ApiFuncs"


//get user account
//render league join code
//
const Settings = () => {
     const {user, login, logout} = useAuth()
     const [leagueCode, setLeagueCode] = useState("")

   useEffect(() => {
        getLeagueCode(user.uid, user.league_id).then((res) => {
            setLeagueCode(res)
        })
   }, [])

    return (
        <div className="MainContainer">
            <Header />
            <div className="settingsContainer">
                <p>League Code: {leagueCode}</p>
            </div>
        </div>
    )
}

export default Settings
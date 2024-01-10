'use client'
import { useContext } from "react";
import { dashboardContext } from "../../../components/providers/dashboard.context.js";
import Home from "./Home.js";
import {Settings} from "./Settings.js";

export default function Content(){
    const {active_page} = useContext(dashboardContext)
    if (active_page == 'Home'){ 
        return ( <Home/> ) 
    }else if (active_page == 'Settings'){ 
        return( <Settings/> ) 
    }else{
        return( <Home/>)
    }
}
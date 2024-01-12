'use client'
import { useContext } from "react";
import { dashboardContext } from "../../../components/providers/dashboard.context.js";
import Home from "./Home.js";
import {Settings} from "./Settings.js";
import Boards from "@/components/ui/dashboard/boards/all.js";
import { New_Board } from "@/components/ui/dashboard/boards/new.js";
import { Addside } from "@/components/ui/dashboard/boards/add_side.js";

export default function Content(){
    const {active_page} = useContext(dashboardContext)
    if (active_page == 'Home'){ 
        return ( <Home/> ) 
    }else if (active_page == 'Settings'){ 
        return( <Settings/> ) 
    }else if (active_page == 'Boards'){ 
        return( <Boards/> ) 
    }else if (active_page == 'New_Side'){ 
        return( <Addside/> ) 
    }else if (active_page == 'New_Board'){ 
        return( <New_Board/> ) 
    }else{
        return( <Home/>)
    }
}
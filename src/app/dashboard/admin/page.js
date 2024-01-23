'use client'
import { useContext } from "react";
import { dashboardContext } from "../../../components/providers/dashboard.context.js";
import Home from "./Home.js";
import {Settings} from "./Settings.js";
import { Admin_Panel } from "./AdminPanel.js";
import Boards from "@/components/ui/dashboard/boards/all.js";
import { New_Board } from "@/components/ui/dashboard/boards/new.js";
import { Addside } from "@/components/ui/dashboard/boards/add_side.js";
import { ViewBoard } from "@/components/ui/dashboard/boards/view.js";
import { Edit_Board } from "@/components/ui/dashboard/boards/edit.js";
import { Editside } from "@/components/ui/dashboard/boards/edit_side.js";
import { Agencies } from "./Agencies.js";

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
    }else if (active_page == 'Edit_Side'){ 
        return( <Editside/> ) 
    }else if (active_page == 'View_Side'){ 
        return( <ViewBoard/> ) 
    }else if (active_page == 'New_Board'){ 
        return( <New_Board/> ) 
    }else if (active_page == 'Edit_Board'){ 
        return( <Edit_Board/> ) 
    }else if (active_page == 'Admin_Panel'){ 
        return( <Admin_Panel/> ) 
    }else if (active_page == 'Agencies'){ 
        return( <Agencies/> ) 
    }else{
        return( <Home/>)
    }
}
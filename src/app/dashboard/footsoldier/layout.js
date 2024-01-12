'use client'

import Content from "./page";
import { MdManageAccounts, MdSpaceDashboard } from "react-icons/md";
import Dashboard_Body from "../../../components/ui/dashboard/body.ui";
import {DashboardProvider} from "@/components/providers/dashboard.context";
import { FaChalkboardUser } from "react-icons/fa6";

export default function Layout(){
    return(
        <DashboardProvider>
			<Dashboard_Body navigation={navigation}>
                <Content/>
            </Dashboard_Body>
		</DashboardProvider>
    ) 
}

const navigation = [
    {
        title:  'Home',
        icon:   MdSpaceDashboard
    },
    {
        title:  'Boards',
        icon:   FaChalkboardUser
    },
    {
        title:  'Settings',
        icon:   MdManageAccounts
    }
]
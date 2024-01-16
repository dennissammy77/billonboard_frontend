'use client'

import Content from "./page";
import { MdManageAccounts, MdSpaceDashboard } from "react-icons/md";
import Dashboard_Body from "../../../components/ui/dashboard/body.ui";
import {DashboardProvider} from "@/components/providers/dashboard.context";
import { FaChalkboardUser } from "react-icons/fa6";
import { Notification } from "@/components/ui/dashboard/status_notification";

export default function Layout(){
    return(
        <DashboardProvider>
			<Dashboard_Body navigation={navigation}>
                <Notification/>
                <Content/>
            </Dashboard_Body>
		</DashboardProvider>
    ) 
}

const navigation = [
    {
        id: '1',
        title:  'Home',
        icon:   MdSpaceDashboard
    },
    {
        id: '2',
        title:  'Boards',
        icon:   FaChalkboardUser
    },
    {
        id: '3',
        title:  'Settings',
        icon:   MdManageAccounts
    }
]
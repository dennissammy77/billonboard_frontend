'use client'

import { useContext, useEffect, useState } from "react";
import Content from "./page";
import { MdManageAccounts, MdSpaceDashboard } from "react-icons/md";
import Dashboard_Body from "../../../components/ui/dashboard/body.ui";
import {DashboardProvider} from "@/components/providers/dashboard.context";

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
        id: '1',
        title:  'Home',
        icon:   MdSpaceDashboard
    },
    {
        id: '2',
        title:  'Settings',
        icon:   MdManageAccounts
    }
]
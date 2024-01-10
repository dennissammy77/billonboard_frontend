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
        title:  'Home',
        icon:   MdSpaceDashboard
    },
    {
        title:  'Settings',
        icon:   MdManageAccounts
    }
]
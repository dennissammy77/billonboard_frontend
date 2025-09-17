'use client'
import { Input, InputGroup, InputRightElement, } from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";

export const Search_Input = ({query,set_query,placeholder})=>{
    const [icon, set_icon]=useState(<IoMdSearch/>)
    function handleInput(e){
        if (e.target.value.length > 0 && e.target.value !== ''){
            set_icon(<IoClose/>)
        }else{
            set_icon(<IoMdSearch/>)
        }
        set_query(e.target.value)
    }
    function clearInput (){
        set_query('');
        set_icon(<IoMdSearch/>);
    }
    return(
        <>
            <InputGroup flex='1' borderRadius={'full'} ml={{md:'0',base:'2'}} position={'relative'}>
                <Input type='text' onChange={handleInput} value={query} bg='#e1e6e6' variant='outline' borderRadius={'full'} placeholder={placeholder} outline={'none'}/>
                <InputRightElement cursor={'pointer'} onClick={clearInput} bg='#3874ff' color='#fff' borderLeft='1px solid #eee' borderRadius={'full'} mt='1' mx='2' boxSize={8}>
                    {icon}
                </InputRightElement>
            </InputGroup>	
        </>
    )
}
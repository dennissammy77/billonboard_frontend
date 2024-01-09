'use client'
import React, { useContext, useState } from 'react'
import {useRouter} from 'next/navigation';
import {Flex,Text,Button, SlideFade, useDisclosure, Box, HStack, Image} from '@chakra-ui/react'
import { ProfileTag } from './profile_tag';
import { MenuComponent } from './menu';
import { UserContext } from '@/components/providers/user';


function Header(){
    const router = useRouter();
    let user = useContext(UserContext);
    console.log(user)
	return(
		<Flex boxShadow='sm' position='sticky' top='0' left='0' zIndex='2000' bg='#fff' px={{base:'4',md:'8'}} py='4' align={'center'} justify={'space-between'} gap='2' fontWeight={'bold'}>
            <Flex align={'center'} gap='4'>
                <Image src='../boblogo.png' alt='logo' boxSize={6}/>
                <Text cursor={'pointer'} fontSize='20px' color='#6e7891'>BillonBoard</Text>
            </Flex>
            <Flex display={{base:'none',md:'flex'}} align={'center'} gap='3' fontSize={'sm'}>
                {user !== null?
                    <ProfileTag/>
                    :
                    <Flex align={'center'} gap='4'>
                        {links?.map((i, index)=>{
                            return(
                                <Text onClick={(()=>{router.push(`${i.link}`)})} _hover={{bg:'#343838', color: '#fff', p:'1', borderRadius:'sm',transition:'ease-out .5s', boxShadow:'sm'}} cursor={'pointer'} key={index}>{i.name}</Text>
                            )
                        })}
                        <Button _hover={{boxShadow:'lg'}} onClick={(()=>{router.push('/auth/signup')})} bg='#3874ff' color='#fff' size='sm'>Free Sign Up</Button>
                    </Flex>
                }
            </Flex>
            <Box display={{base:'flex',md:'none'}}>
                <MenuComponent/>
            </Box>
        </Flex>
	)
}

export default Header;

const links = [
    {name:'Sign In', link:'/auth/signin'}
]
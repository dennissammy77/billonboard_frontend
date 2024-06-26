'use client'
import React, { useContext, useEffect, useState } from 'react'
import {useRouter} from 'next/navigation';
import {Flex,Text,Button, SlideFade, useDisclosure, Box, HStack, Image, Icon, Menu, MenuButton, MenuList, MenuItem, Divider} from '@chakra-ui/react'
import { ProfileTag } from './profile_tag';
import { MenuComponent } from './menu';
import { UserContext } from '@/components/providers/user.context';
import { MdExplore } from 'react-icons/md';
import { FaChevronDown } from "react-icons/fa";
import { FaChalkboardUser } from 'react-icons/fa6';
import Link from 'next/link';


function Header(){
    const router = useRouter();
    const {user} = useContext(UserContext);
    useEffect(()=>{
        router.prefetch('/auth/signin')
        router.prefetch('/auth/signup')
        router.prefetch('/billboards/all')
        router.prefetch('/agencies/all')
    },[])
	return(
		<Flex boxShadow='sm' position='sticky' top='0' left='0' zIndex='2000' bg='#fff' px={{base:'4',md:'8'}} py='4' align={'center'} justify={'space-between'} gap='2' fontWeight={'bold'}>
            <Flex align={'center'} gap='4' onClick={(()=>{router.push('/')})}>
                <Image src='../boblogo.png' alt='logo' boxSize={6}/>
                <Text cursor={'pointer'} fontSize='20px' color='#6e7891'>BillonBoard</Text>
            </Flex>
            <Flex display={{base:'none',md:'flex'}} align={'center'} gap='3' fontSize={'sm'}>
                {user !== null?
                    <Flex gap='2' align='center'>
                        <HStack _hover={{bg:'#343838', color: '#fff', p:'1', borderRadius:'sm',transition:'ease-out .5s', boxShadow:'sm'}} cursor={'pointer'} onClick={(()=>{router.push(`/billboards/all`)})}>
                            <Icon as={MdExplore} boxSize='4'/>
                            <Text>Explore boards</Text>
                        </HStack>
                        <HStack _hover={{bg:'#343838', color: '#fff', p:'1', borderRadius:'sm',transition:'ease-out .5s', boxShadow:'sm'}} cursor={'pointer'} onClick={(()=>{router.push(`/agencies/all`)})}>
                            <Icon as={FaChalkboardUser} boxSize='4'/>
                            <Text>Explore Agencies</Text>
                        </HStack>
                        <ProfileTag/>
                    </Flex>
                    :
                    <Flex align={'center'} gap='4'>
                        <Link href={`/billboards/all`}>
                            <HStack _hover={{bg:'#343838', color: '#fff', p:'1', borderRadius:'sm',transition:'ease-out .5s', boxShadow:'sm'}} cursor={'pointer'}>
                                <Icon as={MdExplore} boxSize='4'/>
                                <Text>Explore boards</Text>
                            </HStack>
                        </Link>
                        <Link href={`/agencies/all`}>
                            <HStack _hover={{bg:'#343838', color: '#fff', p:'1', borderRadius:'sm',transition:'ease-out .5s', boxShadow:'sm'}} cursor={'pointer'} onClick={(()=>{router.push(`/agencies/all`)})}>
                                <Icon as={FaChalkboardUser} boxSize='4'/>
                                <Text>Explore Agencies</Text>
                            </HStack>
                        </Link>
                        {links?.map((i, index)=>{
                            return(
                                <Link href={`${i.link}`}>
                                    <Text _hover={{bg:'#343838', color: '#fff', p:'1', borderRadius:'sm',transition:'ease-out .5s', boxShadow:'sm'}} cursor={'pointer'} key={index}>{i.name}</Text>
                                </Link>
                            )
                        })}
                        <Link href={'/auth/signup'}>
                            <Button _hover={{boxShadow:'lg'}}  bg='#3874ff' color='#fff' size='sm'>Free Sign Up</Button>
                        </Link>
                    </Flex>
                }
            </Flex>
            <Flex display={{base:'flex',md:'none'}} gap='2' align={'center'}>
                <Menu>
                    <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                        Explore
                    </MenuButton>
                    <MenuList>
                        <HStack p='4' cursor={'pointer'} onClick={(()=>{router.push(`/billboards/all`)})}>
                            <Icon as={MdExplore} boxSize='6'/>
                            <Text>Explore Billboards</Text>
                        </HStack>
                        <Divider/>
                        <HStack p='4' cursor={'pointer'} onClick={(()=>{router.push(`/agencies/all`)})}>
                            <Icon as={FaChalkboardUser} boxSize='6'/>
                            <Text>Explore Agencies</Text>
                        </HStack>
                    </MenuList>
                </Menu>
                <MenuComponent/>
            </Flex>
        </Flex>
	)
}

export default Header;

const links = [
    {name:'Sign In', link:'/auth/signin'}
]
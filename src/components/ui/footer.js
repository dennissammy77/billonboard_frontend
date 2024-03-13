'use client'
import { Flex, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

function Footer() {
  return (
    <Flex w="full" as="footer" flexDir={{ base: "column", sm: "row"}} align="center" justify="space-between" px="6" py="4" bg="white">
        <Link href="/" fontSize="xl" fontWeight="bold" color="gray.600"> BillOnBoard </Link>
        <Text py={{ base: "2", sm: "0", }} color="gray.800" > All rights reserved </Text>
        <Flex mx="-2" gap='3'>
            <Link href="https://www.linkedin.com/company/bill-on-board/" mx="2" color="gray.600" _hover={{ color: "gray.500", }} aria-label="LinkedIn">
                <Icon boxSize="6" viewBox="0 0 24 24" fill="currentColor" as={FaLinkedin} />
            </Link>
            <Link href="https://twitter.com/Billonboardke" mx="2" color="gray.600" _hover={{ color: "gray.500", }} aria-label="Twitter">
                <Icon boxSize="6" viewBox="0 0 24 24" fill="currentColor" as={FaXTwitter} />
            </Link>
            <Link href="https://www.facebook.com/Billonboards/" mx="2" color="gray.600" _hover={{color: "gray.500",}} aria-label="Facebook">
                <Icon boxSize="6" viewBox="0 0 24 24" fill="currentColor" as={FaFacebookF} />
            </Link>
            <Link href="https://www.instagram.com/bill.onboard/" mx="2" color="gray.600" _hover={{ color: "gray.500"}} aria-label="Instagram">
                <Icon boxSize="6" viewBox="0 0 24 24" fill="currentColor" as={FaInstagram} />
            </Link>
        </Flex>
    </Flex>
  )
}

export default Footer
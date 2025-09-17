'use client'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Badge, Button, Input, useToast } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import DeleteUser from '@/api/auth/client/delete/route';
import { dashboardContext } from '@/components/providers/dashboard.context';

export default function DeleteUserAccount({delete_account_disclosure, data}) {
    const toast = useToast();
    const router = useRouter()
    const { isOpen, onOpen, onClose } = delete_account_disclosure;
    const {set_page} = useContext(dashboardContext)
    const cancelRef = React.useRef();
    const payload = {
      account_type: data?.account_type,
      id: data?._id
    }

    const [confirm_input,set_confrim_input]=useState('')
    const handleDelete=async()=>{
      if (confirm_input === 'DELETE'){
        await DeleteUser(payload).then((response)=>{
          toast({ title: 'Account deleted successfully', description: '', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
          onClose();
          set_page('Home')
          return ;
        }).catch((err)=>{
          toast({ title: 'Error in deleting your account', description: '', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
          return ;
        })
      }else{
        toast({ title: 'Could not delete user', description: 'To delete a user ensure the input match', status: 'warning', variant:'left-accent', position:'top-left', isClosable: true, });
        return ;
      }
    }

    return (
      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Account
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure? You can not undo this action afterwards.
                By deleting this account, the user will not have access to use the service and/or the platform.
                <br/>
                Type <Badge >DELETE</Badge> to remove the user.
                <Input my='2' placeholder='type: DELETE' value={confirm_input} onChange={((e)=>{set_confrim_input(e.target.value)})}/>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={handleDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
}
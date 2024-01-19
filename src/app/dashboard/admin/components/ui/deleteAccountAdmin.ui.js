'use client'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import DeleteUser from '@/api/auth/client/delete/route';

export default function DeleteUserAccount({delete_account_disclosure, data}) {
    const toast = useToast();
    const router = useRouter()
    const { isOpen, onOpen, onClose } = delete_account_disclosure;
    const cancelRef = React.useRef();
    const payload = {
      account_type: data?.account_type,
      id: data?._id
    }
    const handleDelete=async()=>{
      await DeleteUser(payload).then((response)=>{
        toast({ title: 'Account deleted successfully', description: '', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
        onClose();
        return ;
      }).catch((err)=>{
        toast({ title: 'Error in deleting your account', description: '', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
      })
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
                Are you sure? You can't undo this action afterwards.
                By deleting this account, the user will not have access to use the service and/or the platform.
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
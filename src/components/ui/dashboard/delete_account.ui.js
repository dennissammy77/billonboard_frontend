'use client'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
// import DeleteAccount from '../../../pages/api/auth/delete_account';
import { UserContext } from '@/components/providers/user.context';
import useLogOut from '@/components/hooks/useLogOut.hook';
import DeleteUser from '@/api/auth/client/delete/route';

export default function DeleteUserAccount({delete_account_disclosure}) {
    const toast = useToast();
    const router = useRouter()
    const { isOpen, onOpen, onClose } = delete_account_disclosure;
    const cancelRef = React.useRef();
    const {user,set_user_handler} = useContext(UserContext);
    const payload = {
      account_type: user?.account_type,
      id: user?._id
    }
    const handleDelete=async()=>{
      await DeleteUser(payload).then((response)=>{
        toast({ title: 'Account deleted successfully', description: '', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
        setTimeout(()=>{
          useLogOut();
          router.push('/');
        },2000)
        set_user_handler(`${user?.first_name} deleted`)
      }).catch((err)=>{
        onClose();
        console.log(err)
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
                By deleting this account, You will not have access to use the service and/or the platform.
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
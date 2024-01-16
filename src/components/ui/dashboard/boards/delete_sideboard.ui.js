'use client'
import DeleteSideBoard from '@/api/billboards/board/delete/route';
import { dashboardContext } from '@/components/providers/dashboard.context';
import { UserContext } from '@/components/providers/user.context';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react';
import React, { useContext, useRef } from 'react';

export default function DeleteSideBoardUi({delete_sideboard_disclosure}) {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = delete_sideboard_disclosure;
    const {set_page,side_board_data,set_side_board_data} = useContext(dashboardContext);
    const {user} = useContext(UserContext);
    const cancelRef = useRef();

    const handleDelete=async()=>{
        if(user?.suspension_status){
            toast({ title: 'Error!', description: 'Your account is currently suspended', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
            return ;
        }else if(!user?.verified_email_status){
            toast({ title: 'Error!', description: 'Your account has not been approved', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
            return ;
        }else {
            await DeleteSideBoard(side_board_data?._id).then((response)=>{
                toast({ title: 'Side board deleted successfully', description: '', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
            }).catch((err)=>{
                console.log(err)
                toast({ title: 'Error in deleting your Side board', description: err?.response?.data, status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
                return ;
            }).finally(()=>{
                onClose();
                set_page('Boards');
                set_side_board_data(null)
            })
        }
    }
    return (
      <>
        <AlertDialog motionPreset='slideInBottom' leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Side board
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
                By deleting this product, You will not have access to use the product.
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
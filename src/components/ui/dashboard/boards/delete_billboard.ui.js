'use client'
import DeleteBillBoard from '@/api/billboards/delete/route';
import { dashboardContext } from '@/components/providers/dashboard.context';
import { UserContext } from '@/components/providers/user.context';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from '@chakra-ui/react';
import React, { useContext, useRef } from 'react';

export default function DeleteBillboardUi({delete_billboard_disclosure}) {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = delete_billboard_disclosure;
    const {set_page,board_data} = useContext(dashboardContext);
    const {user} = useContext(UserContext);
    const cancelRef = useRef();

    const handleDelete=async()=>{
        if(user?.suspension_status){
            toast({ title: 'Error!', description: 'Your account is currently suspended', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
            return ;
        }else if(!user?.verification_status){
            toast({ title: 'Error!', description: 'Your account has not been approved', status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
            return ;
        }else {
            await DeleteBillBoard(board_data?._id).then((response)=>{
                toast({ title: 'Billboard deleted successfully', description: '', status: 'success', variant:'left-accent', position:'top-left', isClosable: true, });
            }).catch((err)=>{
                console.log(err)
                toast({ title: 'Error in deleting your billboard', description: err?.response?.data, status: 'error', variant:'left-accent', position:'top-left', isClosable: true, });
                return ;
            }).finally(()=>{
                onClose();
                set_page('Boards')
            })
        }
    }
    return (
      <>
        <AlertDialog motionPreset='slideInBottom' leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete BillBoard
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
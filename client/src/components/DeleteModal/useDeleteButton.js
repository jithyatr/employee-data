import { useDisclosure, useToast } from '@chakra-ui/react';
import React, { useRef } from 'react'
import { toastContent } from '../../utils/formValidators';

const useDeleteButton = ({ handleDelete, emp }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const toast = useToast();

    const confirmDelete = async () => {
        try {
            await handleDelete(emp._id);
            toast(toastContent(`${emp.name} has been removed successfully.`, "Employee Deleted", "success"))
        } catch (error) {
            toast(toastContent(error.message || "Something went wrong.", "Delete Failed", "error"))
        }
        onClose();
    };
    return {
        isOpen,
        onOpen,
        confirmDelete,
        cancelRef,
        onClose,
    }
}

export default useDeleteButton
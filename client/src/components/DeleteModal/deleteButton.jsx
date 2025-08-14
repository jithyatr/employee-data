import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from "@chakra-ui/react";
import useDeleteButton from "./useDeleteButton";

export default function DeleteButton({ emp, handleDelete }) {
    const {
        isOpen,
        onOpen,
        confirmDelete,
        cancelRef,
        onClose
    } = useDeleteButton({ handleDelete, emp });

    return (
        <>
            <Button
                colorScheme="red"
                size="sm"
                onClick={onOpen}
            >
                Delete
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Employee
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete <b>{emp.name}</b>? This action
                            cannot be undone.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

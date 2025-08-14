import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerHeader,
    FormLabel,
    Stack,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { Form } from "informed";
import SwitchInput from "../SwitchInput/switchInput";
import useEditEmployee from "./useEditEmployee";
import ChakraInput from "../Input/chakraInput";

const EditEmployee = ({ isOpen, onClose, employee }) => {
    const firstField = useRef();
    const { handleSubmit, initialValues } = useEditEmployee({ onClose, employee });

    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            initialFocusRef={firstField}
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                    Edit Employee
                </DrawerHeader>

                <DrawerBody>
                    <Form
                        onSubmit={handleSubmit}
                        initialValues={initialValues}
                    >
                        <Stack spacing="24px">
                            <Box>
                                <FormLabel>Name</FormLabel>
                                <ChakraInput
                                    field="name"
                                    ref={firstField}
                                    placeholder="Enter name"
                                />
                            </Box>
                            <Box>
                                <FormLabel>Designation</FormLabel>
                                <ChakraInput
                                    field="designation"
                                    placeholder="Enter your designation"
                                />
                            </Box>

                            <Box>
                                <FormLabel>Career Start Date</FormLabel>
                                <ChakraInput
                                    field="careerStartDate"
                                    type="month"
                                />
                            </Box>
                            <Box>
                                <FormLabel>WAC Joining Date</FormLabel>
                                <ChakraInput
                                    field="joiningDate"
                                    type="date"
                                />
                            </Box>
                            <Box>
                                <FormLabel>Projects</FormLabel>
                                <ChakraInput
                                    field="projects"
                                    placeholder="e.g., Project A, Project B"
                                />
                            </Box>

                            <Box display="flex" alignItems="center" gap="10px">
                                <FormLabel mb="0">On Bench</FormLabel>
                                <SwitchInput field="onBench" />
                            </Box>
                        </Stack>

                        <DrawerFooter borderTopWidth="1px">
                            <Button variant="outline" mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue" type="submit" >
                                Save Changes
                            </Button>
                        </DrawerFooter>
                    </Form>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default EditEmployee;

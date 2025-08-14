import {
    Box, Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerOverlay,
    DrawerCloseButton, DrawerHeader, FormLabel, Input, Stack, Switch
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import useCreateEmployee from './useCreateEmployee';
import SwitchInput from '../SwitchInput/switchInput';
import { Form } from 'informed';
import ChakraInput from '../Input/chakraInput';
import { composeValidators, validateName, validateRequired } from '../../utils/formValidators';

const CreateEmployee = ({ isOpen, onClose }) => {
    const firstField = useRef();
    const { handleSubmit } = useCreateEmployee({ onClose });

    return (
        <Drawer isOpen={isOpen} placement="right" initialFocusRef={firstField} onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">Create a new employee</DrawerHeader>

                <DrawerBody>
                    <Form onSubmit={handleSubmit}>
                        <Stack spacing="24px">
                            <Box>
                                <FormLabel>Name</FormLabel>
                                <ChakraInput
                                    field="name"
                                    ref={firstField}
                                    placeholder="Enter name"
                                    validate={composeValidators(validateRequired, validateName)}
                                />

                            </Box>
                            <Box>
                                <FormLabel>Designation</FormLabel>
                                <ChakraInput
                                    field="designation"
                                    placeholder="Enter your designation"
                                    validate={composeValidators(validateRequired)}
                                />

                            </Box>

                            <Box>
                                <FormLabel>Career Start Date</FormLabel>
                                <ChakraInput
                                    field="careerStartDate"
                                    type="month"
                                    validate={validateRequired}
                                />
                            </Box>


                            <Box>
                                <FormLabel>WAC Joining Date</FormLabel>
                                <ChakraInput
                                    field="joiningDate"
                                    type="date"
                                    validate={validateRequired}
                                />
                            </Box>

                            <Box>
                                <FormLabel>Projects</FormLabel>
                                <ChakraInput
                                    field="projects"
                                    placeholder="e.g., Project A, Project B"
                                    validate={validateRequired}
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
                            <Button colorScheme="blue" type="submit">
                                Submit
                            </Button>
                        </DrawerFooter>
                    </Form>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};


export default CreateEmployee;

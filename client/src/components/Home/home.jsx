import React from 'react'
import EmployeeTable from '../Table'
import { Box, Button, Heading, useDisclosure } from '@chakra-ui/react';
import CreateEmployee from '../CreateEmployee/createEmployee';

const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box p={6}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
                <Heading size="lg">Employee Dashboard</Heading>
                <Button colorScheme="teal" onClick={onOpen}>
                    Create Employee
                </Button>

            </Box>
            <EmployeeTable />
            <CreateEmployee isOpen={isOpen} onClose={onClose} />
        </Box>
    );
}

export default Home;
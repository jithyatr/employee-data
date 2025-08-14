import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Center,
    Spinner,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import useTable from "./useTable";
import EditEmployee from "../EditEmployee/editEmployee";
import DeleteButton from "../DeleteModal/deleteButton";
import { calculateExperiences } from "../../utils/calculateExperience";

const EmployeeTable = () => {
    const {
        data,
        error,
        isLoading,
        handleEditClick,
        handleClose,
        selectedEmployee,
        isEditOpen,
        handleDelete,
    } = useTable();

    if (isLoading) {
        return (
            <Center py={10}>
                <Spinner size="xl" color="blue.500" />
            </Center>
        );
    }
    if (error) {
        return (
            <Center py={10}>
                <Alert status="error" borderRadius="md" maxW="md">
                    <AlertIcon />
                    Failed to load employee data. Please try again.
                </Alert>
            </Center>
        );
    }
    return (
        <>
            <TableContainer>
                <Table variant="striped" colorScheme="gray">
                    <Thead>
                        <Tr>
                            <Th>S.No</Th>
                            <Th>Name</Th>
                            <Th>Designation</Th>
                            <Th>Total Experience</Th>
                            <Th>WAC Experience</Th>
                            <Th>Projects</Th>
                            <Th>On Bench</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.map((emp, index) => (
                            <Tr key={emp._id}>
                                <Td>{index + 1}</Td>
                                <Td>{emp.name}</Td>
                                <Td>{emp.designation}</Td>
                                <Td>
                                    {(() => {
                                        const { total } = calculateExperiences(
                                            emp?.careerStartDate,
                                            emp?.joiningDate
                                        );
                                        return `${total?.years}y ${total?.months}m`;
                                    })()}
                                </Td>

                                <Td>
                                    {(() => {
                                        const { currentCompany } = calculateExperiences(
                                            emp?.careerStartDate,
                                            emp?.joiningDate
                                        );
                                        return `${currentCompany.years || 0}y ${currentCompany.months || 0}m`;
                                    })()}
                                </Td>

                                <Td>{emp.projects?.join(", ")}</Td>
                                <Td>{emp.onBench ? "Yes" : "No"}</Td>
                                <Td>
                                    <Button colorScheme="blue" size="sm" mr={2} onClick={() => handleEditClick(emp)}>
                                        Edit
                                    </Button>
                                    <DeleteButton emp={emp} handleDelete={handleDelete} />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            {selectedEmployee && (
                <EditEmployee
                    isOpen={isEditOpen}
                    onClose={handleClose}
                    employee={selectedEmployee}
                />
            )}
        </>
    );
};

export default EmployeeTable;

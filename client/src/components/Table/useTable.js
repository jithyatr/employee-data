import React, { useState } from 'react'
import useSWR from 'swr';
import { deleteEmployeeRequest, fetcher } from '../../utils/api';
import useSWRMutation from 'swr/mutation';

const useTable = () => {
    const { data, error, isLoading, mutate } = useSWR('http://localhost:3000/api/employees', fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false })
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const { trigger: deleteEmployee } = useSWRMutation(
        "http://localhost:3000/api/employees",
        (url, { arg: id }) => deleteEmployeeRequest(`${url}/${id}`)
    );

    const handleEditClick = (employee) => {
        setSelectedEmployee(employee);
        setIsEditOpen(true);
    };

    const handleClose = () => {
        setIsEditOpen(false);
        setSelectedEmployee(null);
    };

    const handleDelete = async (id) => {
        try {
            await deleteEmployee(id);
            // mutate();
        } catch (err) {
            console.error("Delete failed:", err.message);
        }
    };

    return {
        data,
        error,
        isLoading,
        handleEditClick,
        handleClose,
        selectedEmployee,
        isEditOpen,
        handleDelete,
    }
}

export default useTable
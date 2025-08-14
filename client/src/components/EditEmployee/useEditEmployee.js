import useSWRMutation from 'swr/mutation';
import { baseUrl, updateEmployeeRequest } from '../../utils/api';
import { useToast } from '@chakra-ui/react';
import { mutate } from 'swr';
import { toastContent } from '../../utils/formValidators';

const useEditEmployee = ({ onClose, employee }) => {
    const toast = useToast();
    const { trigger, isMutating } = useSWRMutation(
        `${baseUrl}/api/employees/${employee?._id}`,
        updateEmployeeRequest,
    );

    const handleSubmit = async (values) => {
        try {
            await trigger(values?.values);
            toast(toastContent("Employee updated successfully", "Employee updated", "success"))
            mutate(`${baseUrl}/api/employees`)
            onClose();
        } catch (err) {
            toast(toastContent(err.message || "Something went wrong.", "Error updating employee", "error"))
        }
    };

    const initialValues = {
        name: employee?.name || "",
        designation: employee?.designation || "",
        careerStartDate: employee?.careerStartDate
            ? new Date(employee.careerStartDate).toISOString().slice(0, 7)
            : "",
        joiningDate: employee?.joiningDate
            ? new Date(employee.joiningDate).toISOString().split("T")[0]
            : "",
        projects: Array.isArray(employee?.projects)
            ? employee.projects.join(", ")
            : employee?.projects || "",
        onBench: employee?.onBench || false,
    };
    return {
        handleSubmit,
        isMutating,
        initialValues,
    }
}

export default useEditEmployee
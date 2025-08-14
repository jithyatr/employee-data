import useSWRMutation from 'swr/mutation';
import { baseUrl, createEmployee } from '../../utils/api';
import { useSWRConfig } from 'swr';
import { toastContent } from '../../utils/formValidators';
import { useToast } from '@chakra-ui/react';

const useCreateEmployee = ({ onClose }) => {
    const { mutate } = useSWRConfig();
    const toast = useToast();

    const { trigger } = useSWRMutation(
        `${baseUrl}/api/employees`,
        createEmployee,
        { revalidate: false }
    );

    const handleSubmit = async (values) => {
        try {
            await trigger({
                name: values?.values.name,
                designation: values?.values.designation,
                careerStartDate: values?.values.careerStartDate,
                joiningDate: values?.values.joiningDate,
                projects: values?.values.projects,
                onBench: values?.values.onBench || false
            });
            toast(toastContent("Employee created successfully", "Employee created", "success"))
            mutate(`${baseUrl}/api/employees`);
            onClose();
        } catch (err) {
            toast(toastContent(err.message || "Something went wrong.", "Error creating employee", "error"))
        }
    };

    return { handleSubmit };
};

export default useCreateEmployee;

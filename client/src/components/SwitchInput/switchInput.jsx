import { Switch } from '@chakra-ui/react';
import { useField } from 'informed';

const SwitchInput = ({ field }) => {
    const { fieldState, fieldApi } = useField({ field, type: 'checkbox' });
    return (
        <Switch
            isChecked={fieldState.value || false}
            onChange={(e) => fieldApi.setValue(e.target.checked)}
        />
    );
};

export default SwitchInput;
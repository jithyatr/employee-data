import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { useField } from 'informed';
import React, { forwardRef } from 'react';

const ChakraInput = forwardRef(({ field, validate, ...props }, ref) => {
  const { fieldState, fieldApi } = useField({ field, validate });

  return (
    <FormControl isInvalid={!!fieldState.error && fieldState.touched}>
      <Input
        {...props}
        ref={ref}
        value={fieldState.value || ''}
        onChange={e => fieldApi.setValue(e.target.value)}
        onBlur={() => fieldApi.setTouched(true)}
      />
      {fieldState.error && fieldState.touched && (
        <FormErrorMessage>{fieldState.error}</FormErrorMessage>
      )}
    </FormControl>
  );
});

export default ChakraInput;

export const validateRequired = value => (!value ? 'This field is required' : undefined);

export const validateName = value =>
    /^[A-Za-z\s]+$/.test(value?.trim())
        ? undefined
        : 'Only alphabets and spaces are allowed';

export const toastContent = (description, title, status) => {
    return {
        title,
        description,
        status,
        duration: 3000,
        isClosable: true,
        position: "top-right",
    }
}

export const composeValidators =
    (...validators) =>
        (value) =>
            validators.reduce((error, validator) => error || validator(value), undefined);

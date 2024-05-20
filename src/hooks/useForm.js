import { useEffect, useMemo, useState } from 'react';

// Hook personalizado para manejar formularios y validaciones
export const useForm = (initialForm = {}, formValidations = {}) => {
    const [formState, setFormState] = useState(initialForm); // Estado del formulario
    const [formValidation, setFormValidation] = useState({}); // Estado de validaciones del formulario

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);

    // Memoriza si el formulario es válido
    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }
        return true;
    }, [formValidation]);

    // Maneja el cambio de los campos del formulario
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    // Reinicia el formulario
    const onResetForm = () => {
        setFormState(initialForm);
    };

    // Crea los validadores del formulario
    const createValidators = () => {
        const formCheckedValues = {};
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }
        setFormValidation(formCheckedValues);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    };
};

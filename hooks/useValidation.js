import React, {useState, useEffect} from 'react';

function useValidation(initialState, validate, fn) {
    
    const [values, setValues] = useState(initialState);
    const [imgFile, setImgFile]   = useState(null)
    const [errors, setErrors] = useState({});
    const [submitForm, setSubmitForm] = useState(false);
    
    useEffect( () => {
        if(submitForm) {
            const noErrors = Object.keys(errors).length === 0;      
            if(noErrors!=0){
                fn();
            }
            setSubmitForm(false);
        }
    },[errors])

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }
    
    const handleImageChange = e => {              
        setImgFile(e.target.files[0])      
    }

    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validate(values);
        setErrors(erroresValidacion);
        setSubmitForm(true);
    }

    const handleBlur = e => {
        const erroresValidacion = validate(values);
        setErrors(erroresValidacion);
    }

    return{
        values,
        imgFile,
        errors,
        handleSubmit,
        handleChange,
        handleImageChange,
        handleBlur
        
    }
}

export default useValidation;

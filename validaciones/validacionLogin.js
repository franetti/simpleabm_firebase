export default function validacionLogin(values) {
    let errors= {}
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    
    if(!values.email){
        errors.email = "El email el obligatorio"
    }else if(!regexEmail.test(values.email)){
        errors.email = "Email no valido"
    }

    if(!values.password){
        errors.password = "El password es obligatorio"
    }else if(values.password.length < 6){
        errors.password = "El passowrod debe tener al menos 6 caracteres."
    }

    return errors
}
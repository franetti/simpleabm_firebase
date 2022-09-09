export default function validacionRegister(values) {
    let errors= {}
    const regexUrl = /^(ftp|http|https):\/\/[^ "]+$/

    if(!values.name){
        errors.name = "El nombre del producto obligatorio"
    }

    if(!values.company){
        errors.company = "El nombre de la empresa es obligatorio"
    }
    
    if(!values.url){
        errors.url = "La url es obligatoria"
    }else if(!regexUrl.test(values.url)){
        errors.url = "Invalid URL"
    }

    if(!values.description){
        errors.description = "El description es obligatorio"
    }else if(values.description.length < 10){
        errors.description = "El description debe tener al menos 10 caracteres."
    }

    //VALIDAR PESO DE IMAGEN Y QUE HAYA ALGUNA IMAGEN

    return errors
}
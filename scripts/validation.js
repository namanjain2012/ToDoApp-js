export function validateName(str){
    const regex = /^[a-zA-Z]{2,30}$/;
    return regex.test(str)?"":"Error aagya oye!!";
}

function validateDesc(str){
    const regex = /^[a-zA-Z0-9]{20,}$/;
    return regex.test(str);
}
let newPasswordValue,
confirmPasswordValue;
const submitButton = document.getElementById('updateProfile'),
newPassword = document.getElementById('newPassword'),
confirmPassword = document.getElementById('confirmPassword'),
validationMessage = document.getElementById('validation-message');
let ValidatePasswords  = (message,add,remove)=>{
    validationMessage.textContent = message;
    validationMessage.classList.add(add);
    validationMessage.classList.remove(remove);
};

confirmPassword.addEventListener('input', e=>{
    e.preventDefault();
    newPasswordValue = newPassword.value;
    confirmPasswordValue = confirmPassword.value;
    if(newPasswordValue !== confirmPasswordValue ){
        ValidatePasswords('Passwords do not match', 'color-red', 'color-green');
        submitButton.disabled = true;
    }else{
        ValidatePasswords('Passwords match', 'color-green', 'color-red');
        submitButton.disabled = false;
    }
});



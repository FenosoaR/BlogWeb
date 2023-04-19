const pop = document.querySelector('.pop')
const profil = document.querySelector('.user-profil')
const formRegister = document.querySelector('.form-register')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const confirmation = document.querySelector('#confirmation')
const usernameError =  document.getElementById('username-error')
const emailError =  document.getElementById('email-error')
const passwordError =  document.getElementById('password-error')
const confirmationError =  document.getElementById('confirmation-error')
const btnRegister = document.querySelector('.btn-register')


if(formRegister != null){
    
    formRegister.addEventListener('submit' , function(e){
        e.preventDefault()

        if(!username.value){
            usernameError.textContent = 'Le champ username est obligatoire.';
            username.classList.add('error');
        }else {
            usernameError.textContent = '';
            username.classList.remove('error');
        }
        if(!email.checkValidity()){
            // checkValidity() methode en js si le champ est valide return boolen
            emailError.textContent = 'Veuillez saisir une adresse e-mail valide.';
            email.classList.add('error');
        } else {
            emailError.textContent = '';
            email.classList.remove('error');
        }

        if(password.value.length > 9 ){
            passwordError.textContent = 'Votre mot de passe doit avoir 8 caractères';
            password.classList.add('error');
        }else {
            passwordError.textContent = '';
            password.classList.remove('error');
        }

        if(password.value != confirmation.value){
            confirmationError.textContent = 'Votre mot de passe est incorrecte'
            confirmation.classList.add('error')
        }else{
            confirmationError.textContent = ''
            confirmation.classList.remove('error')
        }
    })
}

if(profil != null){
    profil.addEventListener('click' , function(e){
        e.preventDefault()
        pop.style.display = 'block'
    })
    
}
// if(register != null){
//     register.addEventListener('click' ,function(e){
//         e.preventDefault()
//         popError.style.display = 'block'
//     })
// }

// $('#confirmPwd').on('change',function(){
//     const rightPwd = $('#pwd').val()
//     if ($(this).val() != rightPwd) {
//         $('#pwdError').removeClass('d-none');
//     } else {
//         $('#pwdError').addClass('d-none');
//     }
// })

// // if(edit != null){
// //     edit.addEventListener('click' , function(e){
// //         e.preventDefault()
// //         popError.style.display = 'block'
// //         // console.log('okok');
      
// //     })
// // }

// if(remove != null){
//     remove.addEventListener('click' , function(e){
//         e.preventDefault()
//         popError.style.display = 'block'
//         // console.log('okok');
      
//     })
// }



// if(ok != null){
//     ok.addEventListener('click' , function(e){
//         popError.style.display = 'none'
//     })
    
// }




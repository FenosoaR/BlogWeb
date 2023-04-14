const pop = document.querySelector('.pop')
const profil = document.querySelector('.user-profil')
const popError = document.querySelector('.pop-error')
const register = document.querySelector('.register')
const ok = document.querySelector('.ok')
const edit = document.querySelector('.edit-Error')
const remove = document.querySelector('.remove-Error')


if(profil != null){
    profil.addEventListener('click' , function(e){
        e.preventDefault()
        pop.style.display = 'block'
    })
    
}
if(register != null){
    register.addEventListener('click' ,async function(e){
        e.preventDefault()
        popError.style.display = 'block'
    })
}

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




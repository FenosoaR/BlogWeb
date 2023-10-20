const popUser = document.querySelector('.pop-user')
const userProfil = document.querySelector('.user-profil')
const room = document.getElementById('room')
const notificationLink = document.querySelector('.notification_link')
const messageBar = document.getElementById('message_bar') 
const nbNotif =  document.getElementById('nbNotif')
const popError = document.querySelector('.pop-error')
const errorMessage =document.getElementById('error-message')
const closePopError =  document.querySelector('.close-pop-error')
const quitter = document.querySelector('.fa-arrow-right')
const file = document.querySelector('.ajoutPhoto')
const popPhoto = document.querySelector('.pop-photo')
const closePopPhoto = document.querySelector('.close-pop-photo')
const modifprofil =  document.querySelector('.modif-profil')
const btnProfil = document.querySelector('.btn-profil')
const bars =  document.querySelectorAll('.fa-bars')

if(bars != null){

    for(item of bars){
        item.addEventListener('click' , function(e) {

            const PostId = e.target.id
            const popBar = document.getElementById(`pop-bar-${PostId}`)
            popBar.style.display = 'block'
        })
    }
} 

if(errorMessage != null){ 
       popError.style.display = 'block'

       closePopError.addEventListener('click', function () {
        popError.style.display = 'none';
    });

}

if(userProfil != null){
    userProfil.addEventListener('click' , function(e){     
        popUser.style.display = 'block';
    })   
    quitter.addEventListener('click' , function(e){
        popUser.style.display = 'none'
    })
}

if(file!=null){
    file.addEventListener('click' , function(e){
        popPhoto.style.display = 'block'
       
    })
    closePopPhoto.addEventListener('click', function(e){
        popPhoto.style.display = 'none'
    })
  
}

if(btnProfil!=null){
    btnProfil.addEventListener('click' , function (e){
        modifprofil.style.display = 'block'
    })
}

if(room != null){

    const socket = io();

    let roomName = room.value

    socket.emit('room' , roomName)

    socket.on('follow', (user) => {

                
            notificationLink.style.color = 'red'
            

            const p = document.createElement('p')
            p.innerText = user.username+' followed you '
            messageBar.append(p)
        
    });

    socket.emit('post_room' , roomName)


    socket.on('new_post' , (user)=>{

        notificationLink.style.color = 'red'

        const p = document.createElement('p')
        p.innerText = user.username+' posted new article '
        messageBar.append(p) 

    })

    socket.emit('like_room' , roomName)

    socket.on('new_like' , (user)=>{

        notificationLink.style.color = 'red'

        const p = document.createElement('p')
        p.innerText = user.username+' liked your post '
        messageBar.append(p)     
    })

    socket.emit('comment_room' , roomName)

    socket.on('new_like_comment' , (user)=>{

        notificationLink.style.color = 'red'

        const p = document.createElement('p')
        p.innerText = user.username+' liked your comment '
        messageBar.append(p)
        
    })

}

const popLike = document.querySelector('.pop-like')
const likes = document.querySelector('.likes')
const close = document.querySelector('.close')

if(likes != null){
    likes.addEventListener('click' , function(e){
        popLike.style.display = 'block'
    })
}

if(close != null){
    close.addEventListener('click' , function(e){
        popLike.style.display = 'none'
    })
}




















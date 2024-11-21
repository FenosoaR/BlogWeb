const popUser = document.querySelector('.pop-user')
const userProfil = document.querySelector('.user-profil')
const room = document.getElementById('room')
const notificationLink = document.querySelector('.notification_link')
const messageBar = document.getElementById('message_bar') 
const nbNotif =  document.getElementById('nbNotif')
const popError = document.querySelector('.pop-error')
const errorMessage = document.getElementById('error-message')
const closePopError =  document.querySelector('.close-pop-error')
const closePopUser = document.querySelector('.close-user')
const file = document.querySelector('.ajoutPhoto')
const popPhoto = document.querySelector('.pop-photo')
const closePopPhoto = document.querySelector('.close-pop-photo')
const modifprofil =  document.querySelector('.modif-profil')
const btnProfil = document.querySelector('.btn-profil')
const bars =  document.querySelectorAll('.fa-bars')
const popNotif = document.querySelector('.pop-notif')
const closeNotif = document.querySelector('.close-notif')
const notif_non_lu = document.querySelector('.notif_non_lu')
const notif_lu = document.querySelector('.notif_lu')
const profils =  document.getElementById('profils')
const posts = document.querySelectorAll('#posts')
const userPost = document.getElementById('userPost')
const likes = document.querySelectorAll('#likes')
const comments = document.querySelectorAll('#comments')
const newComment = document.querySelectorAll('#newComment')
const form = document.querySelector('.form')
const inputTitle = document.getElementById('title')
const inputContent = document.getElementById('content')
const inputCategory = document.getElementById('category')
const inputFile = document.getElementById('file')
const followers = document.querySelectorAll('#followers')
const likePost = document.querySelector('.likepost')
const Like = document.querySelector('.nblike')
const userFollowed = document.getElementById('userFollowed') 
const likeComment = document.querySelectorAll('.likeComment')
const post =  document.getElementById('post')
const addComment = document.querySelector('.addComment')
const inputComment = document.querySelector('.inputComment')
const follow = document.getElementById('follow')
const following = document.getElementById('following')
const user_connecter = document.getElementById('user_connecter')
const user_followed = document.getElementById('user_followed')
const user_connecter_name = document.getElementById('user_connecter_name')
const closeModifProfil = document.querySelector('.close-modif-profil')
const listeFollowers = document.getElementById('liste-followers')
const popListeFollowers = document.querySelector('.pop-liste-followers')
const closeFollowers = document.querySelector('.closeFollowers')
const user = document.getElementById('user')

const socket = io();




if(listeFollowers != null){
    listeFollowers.addEventListener('click' , function(e){
        popListeFollowers.style.display = 'block'
    })
    closeFollowers.addEventListener('click' , function(e){
        popListeFollowers.style.display = 'none'
    })
}

if(bars != null){

    for(item of bars){
        item.addEventListener('click' , function(e) {

            const PostId = e.target.id
            const popBar = document.getElementById(`pop-bar-${PostId}`)
            const closeBar = document.getElementById(`close-pop-bar-${PostId}`)
            popBar.style.display = 'block'

            closeBar.addEventListener('click', function(e){
                popBar.style.display = 'none'
            })
            
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
    closePopUser.addEventListener('click' , function(e){
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
    closeModifProfil.addEventListener('click' , function(e){
        modifprofil.style.display = 'none'
    }) 
}

if(notificationLink != null){
    notificationLink.addEventListener('click' , function(e){
        console.log('okok')
        notificationLink.style.color = 'black'
        popNotif.style.display = 'block'
        
    })
}

if(closeNotif != null){
    closeNotif.addEventListener('click' , function (e){
        popNotif.style.display = 'none'
    })
   
}
if(profils != null){

    profils.addEventListener('click' , function(e){

        if(notif_non_lu){

            let userId = user.value

            notif_non_lu.classList.toggle('notif_lu')

            let roomName = room.value
            socket.emit('set-lu' , roomName)

            window.location.href = `/otherProfil/${userId}`

        }

        if(notif_lu){

            let userId = user.value

            window.location.href = `/otherProfil/${userId}`
        }
      
        
    })
}


if(posts != null){
    
    for(item of posts){

        item.addEventListener('click' , function(e){

          
            const PostId = e.target.nextElementSibling.value

                if(notif_non_lu){

                console.log(document.nextSibling);

                

                notif_non_lu.classList.toggle('notif_lu')

                let roomName = room.value
                socket.emit('set-lu' , roomName)

                window.location.href = `/single/${PostId}`

                }

                if(notif_lu){

                    window.location.href = `/single/${PostId}`
                }


        })
    }

  
}


if(likes != null){
    
    for(like of likes){

        like.addEventListener('click' , function(e){

          
            const PostId = e.target.nextElementSibling.value

                if(notif_non_lu){

                console.log(document.nextSibling);

                

                notif_non_lu.classList.toggle('notif_lu')

                let roomName = room.value
                socket.emit('set-lu' , roomName)

                window.location.href = `/single/${PostId}`

                }

                if(notif_lu){

                    window.location.href = `/single/${PostId}`
                }


        })
    }

  
}



if(comments != null){
    
    for(comment of comments){

        comment.addEventListener('click' , function(e){

          
            const PostId = e.target.nextElementSibling.value

                if(notif_non_lu){

                console.log(document.nextSibling);

                

                notif_non_lu.classList.toggle('notif_lu')

                let roomName = room.value
                socket.emit('set-lu' , roomName)

                window.location.href = `/single/${PostId}`

                }

                if(notif_lu){

                    window.location.href = `/single/${PostId}`
                }


        })
    }

  
}  




if(newComment != null){
        
    for(newComs of newComment){

        newComs.addEventListener('click' , function(e){

          
            const PostId = e.target.nextElementSibling.value

                if(notif_non_lu){

                console.log(document.nextSibling);

                

                notif_non_lu.classList.toggle('notif_lu')

                let roomName = room.value
                socket.emit('set-lu' , roomName)

                window.location.href = `/single/${PostId}`

                }

                if(notif_lu){

                    window.location.href = `/single/${PostId}`
                }


        })
    }

  
} 
const popLike = document.querySelector('.pop-like')
const listeLikes = document.querySelector('.listeLikes')
const close = document.querySelector('.close')

if(listeLikes != null){
    listeLikes.addEventListener('click' , function(e){
        popLike.style.display = 'block'
    })
    close.addEventListener('click' , function(e){
        popLike.style.display = 'none'
    })
}

if(form != null){

    form.addEventListener('submit' , (event)=>{

      event.preventDefault()
      
      if(inputFile.files[0]){

          const formdata = new FormData()
            
      
          formdata.append('title' , inputTitle.value)
          formdata.append('content' , inputContent.value)
          formdata.append('file' , inputFile.files[0])
          formdata.append('categories' , inputCategory.value)
          formdata.append('UserId' , userPost.value)

          axios.post('http://localhost:9000/write' , formdata)
          .then((res) =>{

         
          let data = res.data.newPost
         
          let UserId = user.value
      
          socket.emit('new_post', data)

          window.location.href = '/'
         
        })
        .catch(e => console.log(e))
          
      }else{

           const formdata = new FormData()
            
      
          formdata.append('title' , inputTitle.value)
          formdata.append('content' , inputContent.value)
          formdata.append('file' , null)
          formdata.append('categories' , inputCategory.value)
          formdata.append('UserId' , user.value)

          axios.post('http://localhost:9000/write' , formdata)
         .then((res) =>{

         
          let data = res.data.newPost
         
          let UserId = user.value
      
          socket.emit('new_post', data)

          window.location.href = '/'
        })
        .catch(e => console.log(e))
       }    
    })
  
}

if(likePost != null){

    likePost.addEventListener('click' , function(e){

        console.log('ook');

        // console.log(e.target);
        // console.log(e.target.nextElementSibling);

            let postId = e.target.id 
           

            axios.get(`http://localhost:9000/like/${postId}`)
            .then((res) =>{
            
                if(res.data.message){

                    
                    likePost.classList.remove('fa-thumbs-up')
                    likePost.classList.add('fa-thumbs-down')

                   

                    let userId = user.value
                    let FollowedId = userFollowed.value

                    socket.emit('new_like' , userId , FollowedId , postId)

                    
                    let nbLike =  res.data.nbLike
                    Like.innerText = nbLike

            
                    
                }else{

                    likePost.classList.remove('fa-thumbs-down')
                    likePost.classList.add('fa-thumbs-up')


                    let nbLike =  res.data.nbLike
                    Like.innerText = nbLike
                }

                
            })
            .catch((error) =>{console.log(error)})
            })
}


if(likeComment != null){

    for(item of likeComment){

        item.addEventListener('click' , function(event){

            let PostId = post.value
            let CommentId = event.target.id
            let spanCliqué = event.target
        

        
            axios.get(`http://localhost:9000/likeComment/${CommentId}`)
            .then((res) => {

                const likeCountElement = document.querySelector(`.likeCount-${CommentId}`);

                if(res.data.message){ 

                    spanCliqué.classList.add('blue')


                    let userId = user.value
                    let FollowedId = userFollowed.value

                    socket.emit('new_like_comment' , userId , FollowedId , PostId)


                    const nbLike = res.data.nbLikeComment
                    likeCountElement.innerText = nbLike 
                
                } else {

                    spanCliqué.classList.remove('blue')
                
                  
                    const nbLike = res.data.nbLikeComment
                    likeCountElement.innerText = nbLike 
                

                }
            
            
                 
                    
                
            })
            .catch((error =>  console.log(error)))

        })
    }  

}


if(addComment != null){

    addComment.addEventListener('submit' , function(e){

        e.preventDefault()


        let PostId =  post.value
        let UserId = user.value
        let comment = inputComment.value


        let FollowedId = userFollowed.value

        const formdata = new FormData()

        formdata.append('post' , PostId)
        formdata.append('comment' , comment)
        formdata.append('UserId' , UserId)
       
        axios.post('http://localhost:9000/postComment' , formdata)
        .then((res) =>{

            console.log(res.data.newComment);

            let data = res.data.newComment

            socket.emit('new_coms', data, UserId, FollowedId, PostId)

            window.location.href = `/single/${PostId}`
            
        })
        .catch((er) => console.log(er))
    })
}


if(follow != null){

    let FollowedId = user_followed.value
    let userConnecter = user_connecter.value

    
    follow.addEventListener('click' , function(e){

       
        e.preventDefault()
        
        let data = {

            UserId: user_connecter.value,
            FollowedId: user_followed.value,
        }
        
        console.log('okok');
        socket.emit('follow' , data , FollowedId , userConnecter)

        follow.classList.add('dis-none')
        following.classList.remove('dis-none')         

    })
}


if(room != null){


    let roomName = room.value

    socket.emit('room' , roomName)

    socket.on('follow', (user) => {
   
            notificationLink.style.color = 'red'

            const p = document.createElement('p')
            p.innerText = user.username+' vous suit '
            messageBar.append(p)
        
    });

    socket.emit('post_room' , roomName)


    socket.on('new_post' , (user)=>{

        notificationLink.style.color = 'red'

        const p = document.createElement('p')
        p.innerText = user.username+' a posté un nouveau article '
        messageBar.append(p) 

    })

    socket.emit('like_room' , roomName)

    socket.on('new_like' , (user)=>{

        notificationLink.style.color = 'red'

        const p = document.createElement('p')
        p.innerText = user.username+' a aimé votre article '
        messageBar.append(p)     
    })

    socket.emit('comment_room' , roomName)

    socket.on('new_like_comment' , (user)=>{

        notificationLink.style.color = 'red'

        const p = document.createElement('p')
        p.innerText = user.username+' a aimé votre commentaire'
        messageBar.append(p)
        
    })

    socket.emit('addComment_room' , roomName)

    socket.on('new_coms' , (user)=>{

        notificationLink.style.color = 'red'

        const p = document.createElement('p')
        p.innerText = user.username+' a commenté votre article '
        messageBar.append(p)
    })

}

















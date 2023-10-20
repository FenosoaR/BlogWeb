//authentification>yarn add express ejs express-ejs-layouts express-session connect-flash bcryptjs passport passport-local

const express = require('express')
const layout = require('express-ejs-layouts')
const fileUpload = require('express-fileupload')
const database = require('./models')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

const HomeRoute = require('./routes/HomeRoute')
const SecurityRoute = require('./routes/SecurityRoute')
const PostRoute = require('./routes/PostRoute')
const ProfilRoute = require('./routes/ProfilRoute')
const { ensureAuthenticated } = require('./config/security')

require('./config/passport')(passport)

//mcreer serveur am socket
const app = express()
//atsoina ilay module http ao anaty nodejs
const http = require('http')
//avoka ao anaty express miantso anle const izay vao atsofoka satria ao anaty requete http ahafahany mandefa sy maka donnee
const server = http.createServer(app)
const {Server} = require('socket.io')
const {Follow , Posts , Users , Notification} = require('./models')
const path = require('path')


const io = new Server(server)

app.use(fileUpload())
app.use(layout)
app.set('view engine' ,'ejs')
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:false}))

// Servez les fichiers statiques de CKEditor depuis le dossier 'node_modules'
// app.use('/ckeditor', express.static(path.join(__dirname, 'node_modules', 'ckeditor4')));

app.use(session({
    resave:true,
    secret:'test test',
    saveUninitialized:true
}))

app.use(flash())

app.use((req,res, next)=>{
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()

})

app.use(passport.initialize())
app.use(passport.session())

app.use('/' ,  HomeRoute)
app.use('/',SecurityRoute)
app.use('/' ,ensureAuthenticated, PostRoute )
app.use('/' ,ensureAuthenticated, ProfilRoute)

//jerena hoe olona connecter ve ao amle site
io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté :', socket.id);
  
    socket.on('room', (roomName) => {
        
      socket.join(roomName);

    });

    socket.on('set-lu', (roomName) => {
        Notification.update({lu:true} , {where:{FollowedId : roomName}})
      });
  
    socket.on('follow', async (data, FollowedId , userConnecter , nb_notif) => {
        // console.log(data , roomName , userConnecter);

        const user = await Users.findOne({where:{id:userConnecter}})

        console.log(user.username ,'vous suit')

        const newFollow = Follow.build(data)
        newFollow.save()

        const newNotification = Notification.build({

            UserId: userConnecter,
            FollowedId : FollowedId,
            name : 'Follow',
            TargetId : null

        })
        newNotification.save()

       nb_notif = nb_notif++

        socket.to(FollowedId).emit('follow',user , newNotification , nb_notif)
        
    });

    socket.on('post_room', (userId) => { 
        socket.join(userId);
        // console.log(socket.rooms);
    });
          
      
    socket.on('new_post', async (data) => {

        // ID de l'utilisateur qui publie l'article
        
        const userId = data.UserId;
        const PostId = data.id

        // console.log(UserId , data , room);
        const user = await Users.findOne({ where: { id: userId } });
        // Récupérez les followers de cet utilisateur 
        // const followers = await Follow.findAll({where : {FollowedId : userId} , include : Users})
        const followerss = await Notification.findAll({where : {FollowedId : userId , name : "Follow"} , include : Users})

        // console.log(followers);

        for(item of followerss){

            const receiver = item.UserId.toString()

            socket.to(receiver).emit('new_post' , user)

            const newNotification = Notification.build({

                UserId: userId,
                FollowedId : item.UserId,
                name : 'Post',
                TargetId : PostId
    
            })
            newNotification.save()
        }

    });

    socket.on('like_room', (userId) => { 
        socket.join(userId);
        // console.log(socket.rooms);
    });

    socket.on('new_like' , async(userId , FollowedId , postId) => { 

        const user = await Users.findOne({where :{id : userId}})
       
        if(userId != FollowedId){

            socket.to(FollowedId).emit('new_like' , user)

            const newNotification = Notification.build({

                UserId: userId,
                FollowedId : FollowedId,
                name : 'Like',
                TargetId:postId
    
            })
            newNotification.save()
        }

        
        
       
    })

    socket.on('comment_room', (userId) => { 
        socket.join(userId);
        // console.log(socket.rooms);
    });
      

    socket.on('new_like_comment', async(userId , FollowedId , PostId) => {

        const user = await Users.findOne({where :{id : userId}})

        if(userId != FollowedId){

            socket.to(FollowedId).emit('new_like_comment' , user)

            const newNotification = Notification.build({

                UserId: userId,
                FollowedId : FollowedId,
                name : 'Comment',
                TargetId :PostId
    
            })
            newNotification.save()
        }
        
    })
  
    socket.on('disconnect', () => {
      console.log('Un utilisateur est déconnecté :', socket.id);
    });
  });

database.sequelize.sync({force:false})
.then(() => {
    server.listen(9000 , () =>{
        console.log('server started on http://localhost:9000/');
    })    
})
.catch( error => console.log(error))
const {Category , Posts , Notification, Users} = require('../models')
const {dateDePub} = require('../libs/datePub')
const moment = require('moment')

Users.hasMany(Posts)
Posts.belongsTo(Users)

const homepage = async(req, res) => {

    if(req.user){

        const categories = await Category.findAll()
        const posts = await Posts.findAll({ order: [['createdAt', 'DESC']],include: Users}, {limit : 6})

        for(item of posts){
            console.log(item.createdAt);
        }

        const notifications =  await Notification.findAll({
            where : {FollowedId : req.user.id },
            order: [['createdAt', 'DESC']],
            include : Users
        })
    
        for(item of notifications){
    
            const maintenant = moment();
      
            const differenceEnSecondes = maintenant.diff(item.createdAt, 'seconds');
    
            item.publier = differenceEnSecondes
    
        }

        const date = new Date();

        const yearNow = date.getFullYear()

        let annee = []

        for (let index = yearNow + 1  ; index > 2015 ; index--) {
            annee.push(index)
        
        }
        return res.render('homepage' , {categories , posts , user:req.user, dateDePub, annee, notifications})

    }else{
      
      
        const categories = await Category.findAll()
        const posts = await Posts.findAll({ order: [['createdAt', 'DESC']],include: Users}, {limit : 6})


        const date = new Date();

        const yearNow = date.getFullYear()

        let annee = []

        for (let index = yearNow + 1; index > 2015 ; index--) {
                annee.push(index)
            
        }

       return res.render('homepage' , {categories , posts , user:req.user, dateDePub, annee})
    }
    
    
}

// const getPage = async(req, res)=> {

//     let page = req.params.page
//     let offset = (page * 5) - 5
//     // exemple 1 = (1*20)-20 = 20(20 premier amle page)
//     // 2 = (2 * 20) - 20 = 20(manomboka 21 katram 40)
//     console.log(offset);

//     const categories = await Category.findAll()
//     const posts = await Posts.findAll({limit:5 , offset:offset})
    
//     // console.log(posts);

//     return res.render('homepage' , {categories , posts , user:req.user , page})


// }
const header = async (req, res) =>{

    const categories = await Category.findAll()

    // const notifications =  await Notification.findAll({where : {FollowedId : req.user.id}})
    // let nb_notif = notifications.length

    // let annee = []
    

    // for (let index = 0; index < ; index++) {
    //     const element = array[index];
        
    // }

    const notifications =  await Notification.findAll({
        where : {FollowedId : req.user.id },
        order: [['createdAt', 'DESC']],
        include : Users
    })

    for(item of notifications){

        const maintenant = moment();
  
        const differenceEnSecondes = maintenant.diff(item.createdAt, 'seconds');

        item.publier = differenceEnSecondes

    }

    return res.render('component/header' , {categories ,user: req.user , dateDePub, nb_notif, notifications})
}



module.exports = {homepage , header}
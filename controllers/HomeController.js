const {Category , Posts} = require('../models')

const homepage = async(req, res) => {

    if(req.user){

        
        const categories = await Category.findAll()
        const posts = await Posts.findAll({limit:5})

        return res.render('homepage' , {categories , posts , user:req.user})

    }else{
      
      
        const categories = await Category.findAll()
        const posts = await Posts.findAll({limit:5})

       return res.render('homepage' , {categories , posts , user:req.user})
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

    return res.render('component/header' , {categories ,user: req.user})
}



module.exports = {homepage , header}
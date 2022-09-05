
const express = require('express');

const personal_model = require('../model/model');

const route=express.Router()

const checker=(req,res,next)=>{
    if(!req.session.flag)
    {
        return res.send('unable to meet a session')
    }
    next()
}
// route.get('/root/new',checker,(req,res)=>{
//     res.render('home')
// })

// //entering into MONGODB



route.post('/root/',checker,(req,res)=>{
       const obj=req.body
       console.log(obj)
       new personal_model({
        text:obj.text,
        desc:obj.desc,

       }).save().then((result) => {
        console.log('inserted succesfuuly')
        // console.log(result)
        req.flash('info','inserted succesfully in dataBase!')
        res.redirect('/root/')
        
       }).catch((err) => {
        console.log('error found:',err)
       });

})

// //displaying all the contents of the db

route.get('/root',checker,(req,res)=>{
    req.session.val='hehe'
    
    console.log(req.session)
     personal_model.find({}).
     then((result) => {
        // console.log('woriking ',result)
        res.render('show.ejs',{result,message:req.flash('info')})
     }).catch((err) => {
        console.log('not working',err)
     });
     
  
})

// //by specific id
route.get('/root/login',(req,res)=>
{
    res.render('login')
})

route.post('/root/dummy',(req,res)=>
{
    req.session.flag=true;
    res.redirect('/root')
}
)

route.post('/root/logout',(req,res)=>
{
    req.session.destroy()
    res.redirect('/root')
})


//editing the contents interface

// updating the database using the patch request

route.patch('/root',checker,(req,res)=>{
    const newTxt=req.body.txt
    const newDisc=req.body.disc
    const id=req.body.id
    // console.log(id)
    // console.log(newTxt)
    // console.log(newDisc)
    personal_model.findByIdAndUpdate(id,{text:newTxt,desc:newDisc})
    .then((result) => {
        console.log('updated succesfully')
        res.redirect('/root')
    }).catch((err) => {
        console.log(err)
    });
})

//deleting operation

route.delete('/root/:id',checker,(req,res)=>
{
    const id=req.params.id
    personal_model.findByIdAndDelete(id)
    .then((result) => {
        console.log('succes')
    }).catch((err) => {
        console.log('failure',err)
    });

})

route.get('/root/:id/edit',checker,(req,res)=>{
    const id=req.params.id
    res.render('edit',{id:id})
})
//start the server
route.get('/root/:id',checker,(req,res)=>{
    const id=req.params.id
    console.log(typeof(id))
    personal_model.findById(id)
    .then((result) => {
        // console.log(result)
        res.render('unique.ejs',result)

    }).catch((err) => {
        console.log(err)
    });
})
module.exports=route

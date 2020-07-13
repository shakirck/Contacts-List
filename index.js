const express = require('express');
const path = require('path');
const db = require('./config/mongoose');
const Contact  = require('./models/contact');
const port = 5000;
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({useNewUrlParser: true}));

app.use(express.static('assets'));
// app.use(function(req,res,next){
//     console.log('middleware 1');
//     next();
// });
// app.use(function(req,res,next){
//     console.log('middleware 2');
//     next();
// });

var contactList = [
    {
        name :'shakir',
        phone : '1234567890'
    },{
        name:'coding',
        phone :'098767890'
    },
    {
        name:'ninjas',
        phone :'1234567890'
    }

]
app.get('/', function(req, res){


    Contact.find({ },function(err,contactList){
        if(err){
            console.log('Error while fetching from database');
            return ;
        }
        return res.render('profile',{
            title: "Contact List",
            contact_list: contactList
        });
    });


  
});

app.get('/contact',function(req,res){
    return res.render('contact');
})
app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    // contactList.push(req.body);
    Contact.create({
        name:req.body.name,
        phone : req.body.phone
    },function(err,newContact){
        if(err){
            console.log("error");
            return;
        }

        console.log('***************',newContact);
        return res.redirect('back');
    })
    // return res.redirect('back');

})



app.get('/delete-contact/',function(req,res){

    console.log(req.query)
    let phone = req.query.phone;
    let id = req.query.id;
    // const contactIndex = contactList.findIndex(contact => contact.phone==phone);
    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    // }

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error happened while deleteing');
        }
        return res.redirect('back');

    });
})




app.listen(port,function(err){
    if(err){
        console.log('error in running the server');

    }
    console.log('Express server is running on ', port);
})


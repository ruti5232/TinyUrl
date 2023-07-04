import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import TaskRouter from './Routers/TaskRouter.js';
import connectDB from './db.js';

// import dotenv from 'dotenv';
// dotenv.config();


connectDB();
const app = express()

app.use(bodyParser.json());
app.use(cors());


//login - create jwt
//auth middleware - verify jwt
const secretKey = 'joirajdkfjasdfiauij'//מפתח חתימה

app.post('/login', (req, res)=>{
    const {userName, password} = req.body;
    if(userName == "malka" && password == "1234"){//check in db 
        const jsonObj = {userId:45, role:"student", permissions:[], email:"email@gmail.com"};
        const signedJwt = jwt.sign(jsonObj, secretKey);//create jwt
        res.send({token:signedJwt});//send jwt to client
    }else{
        res.status(401).send({message:"משתמש לא ידוע, יש לבצע התחברות"})
    }
})

function middleware (req, res, next){
    console.log('הייתי כאן');
    // res.send('stop')
    //המטרה - ליצור מספר חד ערכי שמשויך לבקשה בשביל התיעוד בלוגים
    req.UUID = crypto.randomUUID();
    next();
}

app.use('/', middleware)

app.get('/bla', (req,res)=>{
    console.log('UUID',req.UUID);
    res.send({message:'bla'});
})
app.use('/tasks', TaskRouter)


app.put('/:id', (req,res)=>{
    res.send('put method')
})

app.delete('/:id', (req,res)=>{
    console.log(req.params.id);
    res.send(`delete method ${req.params["id"]}`)
})

const port = 3000;
app.listen(port, ()=>{
    console.log(`app is running on http://localhost:${port}`)
})
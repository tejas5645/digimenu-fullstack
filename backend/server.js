const express = require('express')
const db = require('./db')
const body_parser = require('body-parser')
const menu = require('./routes/menuRoute')
const food_group = require('./routes/food_groupRoute')
const quantity = require('./routes/quantityRoute')
const admin= require('./routes/adminRoute')
const cors = require('cors')
const session = require("express-session");
require('dotenv').config();

const app = express()

//Middlewares

app.use(cors({
    origin: "http://localhost:5173",  // Change '*' to your frontend URL
    credentials: true,  // Allow credentials (cookies, sessions)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));



app.use(
    session({
      secret: process.env.SESSION_SECRET, 
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 }, 
    })
  );

app.use(body_parser.json())
app.use('/menu', menu)
app.use('/food_group', food_group)
app.use('/quantity', quantity)
app.use('/admin', admin)
app.use(cors({ origin: "http://localhost:5173", credentials: true })); 



console.log("connected")

app.get('/', (req, res) => {
    try {
        res.status(200).json({
            message: "Welcome to the Menu-Card API",
            description: "A simple REST API for managing a digital menu card, built with Express.js and PostgreSQL, supporting CRUD operations for menu items.",
            availableEndpoints: [

                { method: 'GET', endpoint: '/menucard', description: 'Get all menu' },
                { method: 'GET', endpoint: '/count', description: 'Get mene, foodgroup and quantity count' },
                { method: 'POST', endpoint: '/feedback', description: 'Feedback form' },

                { method: 'GET', endpoint: '/admin', description: 'Get Admin panel' },
                { method: 'GET', endpoint: '/admin/check-session', description: 'To check admin is login or not for every request' },
                { method: 'POST', endpoint: '/admin/login', description: 'Admin login page' },
                { method: 'POST', endpoint: '/admin/logout', description: 'Admin logout' },
                { method: 'POST', endpoint: '/admin/menu', description: 'Add a menu' },
                { method: 'PUT', endpoint: '/admin/menu/:mid', description: 'Update a menu' },
                { method: 'PUT', endpoint: '/admin/menu/price/:mid', description: 'Update a menu price' },
                { method: 'DELETE', endpoint: '/admin/menu/:mid', description: 'Delete a menu by uid' },
                { method: 'POST', endpoint: '/admin/food_group', description: 'Add a food_group' },
                { method: 'PUT', endpoint: '/admin/food_group/:fid', description: 'Update a food_group' },
                { method: 'DELETE', endpoint: '/admin/food_group/:fid', description: 'Delete a food_group by fid' },
                { method: 'POST', endpoint: '/admin/quantity', description: 'Add a food_group' },
                { method: 'PUT', endpoint: '/admin/quantity/:qid', description: 'Update a food_group' },
                { method: 'DELETE', endpoint: '/admin/quantity/:qid', description: 'Delete a food_group by qid' },

                { method: 'GET', endpoint: '/menu', description: 'Get all menu' },
                { method: 'GET', endpoint: '/menu/:mid', description: 'Get particular menu by mid' },
                { method: 'GET', endpoint: '/menu/name/:nm', description: 'Get all menu by letter or word' },

                { method: 'GET', endpoint: '/food_group', description: 'Get all food_group' },
                { method: 'GET', endpoint: '/food_group/:fid', description: 'Get particular food_group by fid' },

                { method: 'GET', endpoint: '/quantity', description: 'Get all food_group' },
                { method: 'GET', endpoint: '/quantity/:qid', description: 'Get particular food_group by qid' },

            ]
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


app.get('/menucard', async (req, res) => {

    try {
        const result = await db.query('select mid,mname,fg_name,qtype,price from menu_card,food_group,qty where menu_card.mtype=food_group.fid and menu_card.mqty=qty.qid')

        res.status(200).json({ menu: result.rows })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')

    }

})

app.get('/count', async (req, res) => {

    try {
       

        const result = await db.query('select (select count(*) from menu_card) as mCount, (select count(*) from food_group) as fgCount, (select count(*) from qty) as qCount')

        res.status(200).json({ mcount: result.rows[0].mcount, fgcount: result.rows[0].fgcount, qcount: result.rows[0].qcount })


    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')

    }

})

app.post('/feedback', async (req, res) => {

    try {
        const { uname, email, subject, message } = req.body

        if (!uname || !email || !subject || !message) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const result = await db.query('INSERT INTO feedback(uname,email,subject,message) VALUES ($1,$2,$3,$4) RETURNING *', [uname, email, subject, message])
        res.status(201).json({ status: 201, message: "Added Successfully", feedback: result.rows[0] })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }

})


app.listen(5000, '127.0.0.1', () => {
    console.log('listning on 127.0.0.1:5000')
})
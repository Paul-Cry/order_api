'use strict'


const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const response = require('../response.js')
const db = require('../settings/db')
const config = require('../config.js')


setInterval(function () {
    db.query('SELECT 1');
}, 5000);





exports.sendFeedback = async (req, res)=>{
    db.query("INSERT INTO  `feedback`(`name`, `email`, `reviews`) VALUES ('" + req.body.name + "', '" + req.body.email + "', '" + req.body.feedback + "');", async (error, rows, fields)=>{
        if(error) {
            response.status(400, error, res)
        }else{
            res.status(200)
        }
    })
}


exports.sendMasterClass = async (req, res)=>{
    db.query("INSERT INTO  `masterclass`( `email`, `name`) VALUES ('" + req.body.email + "', '" + req.body.name + "');", async (error, rows, fields)=>{
        if(error) {
            response.status(400, error, res)
        }else{
            res.status(200)
        }
    })
}

exports.getAllFeedback = async (req, res)=>{
    db.query("SELECT email, name, reviews FROM `feedback`;", async (error, rows, fields)=>{
        if(error) {
            response.status(400, error, res)
        }else{
            res.status(200).send(rows);
        }
    })
}


//Регистрация
// exports.signup = async function(req, res) {
//     // Принимаемые данные email password name
//     console.log(req.body)
//   db.query("SELECT `id`, `email`, `name` FROM `betting_user` WHERE `email` = '" + req.body.email + "'", async function(error, rows, fields) {
//         if(error) {
//             response.status(400, error, res)
//         } else if(typeof rows !== 'undefined' && rows.length > 0) {
//             const row = JSON.parse(JSON.stringify(rows))
//             row.map(rw => {
//                 response.status(302, {message: `Пользователь с таким email - ${rw.email} уже зарегстрирован!`}, res)
//                 return true
//             })
//         } else {
//             console.log('Не зарегестрирован')
//             const name = req.body.name
//             const email = req.body.email
//             // const secondName = req.body.second_name !== '' ? req.body.second_name : 'Не указано'
//             const salt = await bcrypt.genSaltSync(15)
//             const password = await bcrypt.hashSync(req.body.password, salt)

//             const sql = "INSERT INTO `betting_user`(`name`, `email`, `password`) VALUES('" + name + "', '" + email + "', '" + password + "')";
//             db.query(sql, (error, results) => {
//                 if(error) {
//                     response.status(400, error, res)

//                 } else {
//                     response.status(200, {message: `Регистрация прошла успешно.`, results}, res)
//                 }
//             })

//         }
//     })

// }
//Авторизация
// exports.signin = (req, res) => {
//     // Принимаемые данные email password
//     db.query("SELECT `email`, `password`, `name` FROM `betting_user` WHERE `email` = '" + req.body.email + "'", (error, rows, fields) => {
//         if(error) {
//             response.status(400, error, res)
//         } else if(rows.length <= 0) {
//             response.status(401, {message: `Пользователь с email - ${req.body.email} не найден. Пройдите регистрацию.`}, res)
//         } else {
//             const row = JSON.parse(JSON.stringify(rows))
//             const user_name = row;
//             row.map(rw => {
//                 const password = bcrypt.compareSync(req.body.password, rw.password)
//                 if(password) {
//                     //Если true мы пускаем юзера и генерируем токен
//                     const token = jwt.sign({
//                         userId: rw.id,
//                         email: rw.email
//                     }, config.jwt, {expiresIn: 120 * 120 })

//                     // res.status(200, {token: `Bearer ${token}`})
                    
//                     // res.status(200).send({token: `Bearer ${token}`});
//                     res.status(200).send(rows[0]);

//                 } else {
//                     //Выкидываем ошибку что пароль не верный
//                     response.status(401, {message: `Пароль не верный.`}, res)

//                 }
//                 return true
//             })
//         }
//     })

// }

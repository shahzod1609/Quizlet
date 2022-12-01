const Auth = require('../models/auth')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator/check')
const { unlink } = require('fs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const Cards = require('../models/Cards')

exports.postLogin = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array(),
            message: 'Have validation error'
        })
    }
    const { email, password } = req.body
    let auth, token, isValidPassword = false
    try {
        auth = await Auth.findOne({ where: { email: email, password: password } })

        // isValidPassword = await bcrypt.compare(password, auth.password)

        // if (!isValidPassword) {
        //     res.json({ validationError: true, message: 'emailyada password nadogry' })
        // }
        token = await jwt.sign(
            { email: auth.email, id: auth.id },
            'do not say our secret okay',
            { expiresIn: '1h' }
        )
    } catch (err) {
        console.log(err)
        res.json({ validationError: true, message: 'emailyada password nadogry' })
    }


    res
        .status(201)
        .json({ id: auth.id, email: auth.email, name: auth.name, image: auth.image, token: token })
    // .json({ userId: auth.id, email: auth.email, token: token, image: auth.image });

    // req.session.user = result.id
    // return req.session.save()
    // console.log('session is saved')

}


exports.putSignup = async (req, res, next) => {
    let userData

    const errors = await validationResult(req)
    const { email, password, confirmPassword, name } = req.body
    if (!errors.isEmpty()) {
        if (req.file) {
            unlink(req.file.path, (err => {
                if (err)
                    throw err
            }))
        }

        return res.json({
            errors: errors.array(),
            message: 'Have validation error'
        })
    }
    let imagePath = await null
    if (req.file) {
        imagePath = await req.file.path
    }
    let hashedPassword, auth, token
    try {
        // hashedPassword = await bcrypt.hash(password, 12)
        auth = await Auth.create({
            email: email,
            // password: hashedPassword,
            password: password,
            name: name,
            image: imagePath
        })
        token = await jwt.sign(
            { email: auth.email, id: auth.id },
            'do not say our secret okay',
            { expiresIn: '1d' }
        )


    } catch (err) {
        console.log(err)
        res.json({ message: 'Sizin yazgylarynyzda yalnyslyk bar' })
    }

    // let newWords = await JSON.parse(fs.readFileSync('controllers/words.json'))
    // try {
    //     const folder = await auth.createFolder({
    //         title: 'Sözler',
    //         description: 'Öwren',
    //         totalModule: 10
    //     })
    //     for (let i = 1; i <= newWords.length; i++) {
    //         const module = await auth.createModule({
    //             title: `Sözler ${i}`,
    //             description: 'Öwren',
    //             totalCards: newWords[i-1].length
    //         })
    //         const usermodel = await module.createUsermodule({
    //             userId: auth.id,
    //             folderId: folder.id
    //         })
    //         const cards = await Cards.bulkCreate(newWords[i - 1])
    //         await usermodel.addCard(cards)
    //         await folder.addUsermodules(usermodel)
    //     }


    // } catch (err) {
    //     console.log(err)
    // }
    // res.json({ userId: auth.id, email: auth.email, token: token, image: auth.image })
    
    res
        .status(201)
        .json({ id: auth.id, email: auth.email, name: auth.name, image: auth.image, token: token })



}

exports.getSignup = (req, res, next) => {
    Auth
        .findAll()
        .then(result => {
            if (!result) {
                return res.json({ message: 'ulanyjylar goshylmadyk' })
            }
            res.json({ signup: result })
        })
        .catch(err => {
            console.log(err)
        })
}


exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err)
    });
    res.json()
}
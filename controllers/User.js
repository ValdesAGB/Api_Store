const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const Blake2b = require('blake2b')
const { v4: uuidv4 } = require('uuid')
const User = require('../models/User')

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashPaswword) => {
      let confirmCode = uuidv4()
      const mailSender = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'valdesagbokoni01@gmail.com',
          pass: 'fhbukibbpibcuflo',
        },
      })

      const mailOptions = {
        from: 'valdesagbokoni01@gmail.com',
        to: req.body.email,
        subject: "Confirmation d'inscription",
        html: `
        <p>Bonjour</p>
        <p>Cliquez sur le lien ci-dessous pour confirmer votre inscription:</p>
        <p><a href="http://localhost:3000/signup/confirm/${confirmCode}">Confirmer mon inscription</a></p>
      `,
      }

      mailSender
        .sendMail(mailOptions)
        .then(() => {
          const newUser = new User({
            email: req.body.email,
            password: hashPaswword,
            confirmationCode: confirmCode,
          })

          newUser
            .save()
            .then(() => res.status(201).json({ Message: 'Utilisateur créé.!' }))
            .catch(() =>
              res.status(400).json({
                error: `Une erreur d'enrégistrement est survenue.`,
              })
            )
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch(() =>
      res.status(500).json({
        error: `
        Une erreur de hash de mot de passe a été rencontré. 
        `,
      })
    )
}

exports.signupConfirm = (req, res, next) => {
  User.findOne({ confirmationCode: req.params.confirmationCode })
    .then((user) => res.status(200).json(user))
    .catch(() =>
      res.status(400).json({ error: 'utilisateur non enrégistré. ' })
    )
}

exports.login = (req, res, next) => {}

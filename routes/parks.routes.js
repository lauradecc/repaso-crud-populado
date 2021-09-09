const express = require('express')
const router = express.Router()
const Park = require('./../models/Park.model')


router.get('/new', (req, res) => res.render('pages/parks/new-park.hbs'))

router.post('/new', (req, res) => {

    const { name, description } = req.body
    
    Park
        .create({ name, description })
        .then(() => res.redirect('/parks/new'))
        .catch(err => console.log(err))
})


module.exports = router

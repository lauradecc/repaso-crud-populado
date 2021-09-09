const express = require('express')
const router = express.Router()
const Park = require('./../models/Park.model')


router.get('/new', (req, res) => res.render('pages/parks/new-park.hbs'))


router.post('/new', (req, res) => {

    const { name, description } = req.body
    
    // || !name.match(/\S/) || !description.match(/\S/)
    if (name.length === 0 || description.length === 0) {
        res.render('pages/parks/new-park.hbs', { errorMsg: 'All fields must be completed' })
    }
    
    Park
        .create({ name, description })
        .then(() => res.redirect('/parks/new'))
        .catch(err => console.log(err))
})


module.exports = router

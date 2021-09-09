const express = require('express')
const router = express.Router()
const Park = require('./../models/Park.model')
const Coaster = require('./../models/Coaster.model');


router.get('/new', (req, res) => {

    Park
        .find()
        .then(parks => res.render('pages/coasters/new-coaster.hbs', { parks }))
        .catch(err => console.log(err))
})

router.post('/new', (req, res) => {

    const { name, description, inversions, length, park_id } = req.body
    
    Coaster
        .create({ name, description, inversions, length, park_id })
        .then(() => res.redirect('/coasters/new'))
        .catch(err => console.log(err))
})


router.get('/', (req, res, next) => {

    Coaster
        .find()
        .populate('park_id')
        .then(coasters => res.render('pages/coasters/coasters-index.hbs', { coasters }))
        .catch(err => console.log(err))
})


router.post('/delete', (req, res) => {

    const { id } = req.query

    Coaster
        .findByIdAndRemove(id)
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log(err)) 
})


router.get('/edit', (req, res) => {

    const { id } = req.query
    const parks = Park.find()
    const coaster = Coaster.findById(id).populate('park_id')

    Promise.all([parks, coaster]).then(data => {

        const [ parks, coaster ] = data
        
        parks.forEach(park => park.isSelected = park.id === coaster.park_id.id)

        res.render('pages/coasters/edit-coaster', { parks, coaster })
    })
    .catch(err => console.log(err))
})


router.get('/:id', (req, res) => {

    const { id } = req.params

    Coaster
        .findById(id)
        .populate('park_id')
        .then(coaster => res.render('pages/coasters/coaster-details.hbs', coaster))
        .catch(err => console.log(err))  
})


module.exports = router

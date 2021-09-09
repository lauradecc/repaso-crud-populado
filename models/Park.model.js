const mongoose = require('mongoose')
const Schema = mongoose.Schema

const parkSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        default: 'unknown'
    },
	description: String,
    isSelected: {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true })

module.exports = mongoose.model('Park', parkSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coasterModel = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        default: 'unknown'
    },
	description: String,
    inversions: Number,
    length: Number,
    active: Boolean,
    park_id: {
        type: Schema.Types.ObjectId,
        ref: 'Park'
    }
    
}, { timestamps: true })

module.exports = mongoose.model('Coaster', coasterModel)
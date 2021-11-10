const mongoose = require('mongoose')

const webscrapScehma = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        // enumerate: ['create', 'queue', 'halt', 'run', 'abort', 'delete', 'success']
    },
    priority: {
        type: Number
    },
    halted: {
        type: Number,
        default: 0
    },
    data: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Webscrap = mongoose.model('Job', webscrapScehma);

module.exports = Webscrap
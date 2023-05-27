const express = require('express')
const router = express.Router()
const { postClips, getClips } = require('../controllers/clipController')

router.route('/:url').get(getClips).post(postClips)

module.exports = router
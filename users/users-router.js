const express = require('express')
const router = express.Router()
const Users = require('./users-model')

router.get('/users', async (req,res) => {
    try {
        res.json(await Users.getUsers())
    } catch(err) {
        res.status(500).json({
            message: "The users information could not be retrieved."
        })
    }
})

router.get('/users/:id', async (req,res) => {
    try {
        const user = await Users.getUserById(req.params.id)

        if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }

        res.json(user)
    } catch(err) {
        res.status(500).json({
            message: "The user information could not be retrieved."
        })
    }
})

router.post('/users', async (req,res) => {
    try {
        if (!req.body.name || !req.body.bio) {
            return res.status(400).json({
                message: 'Please provide name and bio for the user'
            })
        }

        const newUser = await Users.createUser({
            name: req.body.name,
            bio: req.body.bio
        })

        res.status(201).json(newUser)
    } catch(err) {
        res.status(500).json({
            message: "There was an error while saving the user to the database"
        })
    }
})

router.put('/users/:id', async (req,res) => {
    try {
        const user = await Users.getUserById(req.params.id)

        if (!user) {
            res.status(404).json({ 
                message: "The user with the specified ID does not exist." 
            })
        }

        if (!req.body.name || !req.body.bio) {
            return res.status(400).json({
                message: 'Please provide name and bio for the user'
            })
        }

        const updatedUser = Users.updateUser(user.id, {
            name: req.body.name || user.name,
            bio: req.body.bio || user.bio
        })

        res.json(updatedUser)
    } catch(err) {
        res.status(500).json({
            errorMessage: "The user information could not be modified"
        })
    }
})

router.delete('/users/:id', async (req,res) => {
    try {
        const user = await Users.getUserById(req.params.id)

        if (!user) {
            res.status(404).json({ 
                message: "The user with the specified ID does not exist." 
            })
        }

        await Users.deleteUser(req.params.id)

        res.json({
            message: `${user.name} was deleted`
        })
    } catch(err) {
        res.status(500).json({
            errorMessage: "The user could not be removed"
        })
    }
})

module.exports = router
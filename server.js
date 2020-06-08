const express = require('express')
const cors = require('cors')
const server = express()
server.use(express.json())
server.use(cors())
const db = require('./database.js')

server.post('/api/users', (req,res) => {
    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
            message: 'Please provide name and bio for the user'
        })
    }

    try {
        const newUser = db.createUser({
            name: req.body.name,
            bio: req.body.bio
        })
        res.status(201).json(newUser)
    }
    catch(err) {
        res.status(500).json({
            errorMessage: "There was an error while saving the user to the database"
        })
    }
})

server.get('/api/users', (req,res) => {
    try {
        const users = db.getUsers();
        res.json(users)
    }
    catch(err) {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        })
    }
})

server.get('/api/users/:id', (req,res) => {
    try {
        const user = db.getUserById(req.params.id)
        if (!user) {
            res.status(404).json({ 
                message: 'The user with the specified ID does not exist.'
            })
        }
        res.json(user)
    } catch(err) {
        res.status(500).json({
            errorMessage: "The user information could not be retrieved."
        })
    }
})

server.delete('/api/users/:id', (req,res) => {
    try {
        const user = db.getUserById(req.params.id)
        if (!user) {
            res.status(404).json({ 
                message: "The user with the specified ID does not exist." 
            })
        }
        db.deleteUser(req.params.id)
        res.json({
            message: `${user.name} was deleted`
        })
    } catch(err) {
        res.status(500).json({
            errorMessage: "The user could not be removed"
        })
    }
})

server.put('/api/users/:id', (req,res) => {
    try {
        const user = db.getUserById(req.params.id)
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
        const updatedUser = db.updateUser(user.id, {
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

server.listen(8080, () => {
    console.log("server is running on port 8080")
})
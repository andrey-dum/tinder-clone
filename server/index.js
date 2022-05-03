const PORT = 8000

const express = require('express')
const  cors = require('cors')
const { MongoClient } = require('mongodb')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const uri = 'mongodb+srv://tinder_user:LGpzMW9VVpG3Phl5@cluster0.eppkd.mongodb.net/tinder?retryWrites=true&w=majority'
const secretKey = 'm@clustWrites=true&w=majority'

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
    res.json('Hello from my app')
})

app.post('/signup', async (req, res) => {

    const client = new MongoClient(uri);
    const {email, password} = req.body;

    const generatedUserId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await client.connect()
        const db = client.db('tinder')
        const users = await db.collection('users')

        const existingUser = users.findOne({email})

        if(existingUser) {
            return res.status(409).send('User already exists. Please login.')
        }

        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        }

        const isertedUser = await users.insertOne(data)

        const token = jwt.sighn(isertedUser, sanitizedEmail, {
            expiresIn: 60 * 24
        })

        res.status(201).json({
            token,
            userId: generatedUserId,
            email: sanitizedEmail
        })

   } catch (error) {
       console.log(error)
   } 
})

app.get('/users', async (req, res) => {
   const client = new MongoClient(uri)

   try {
       await client.connect()
       const db = client.db('tinder')

       const users = db.collection('users')

       const returnedUsers = await users.find().toArray()

       res.send(returnedUsers)

   } catch (error) {
       console.log(error)
   } finally {
       await client.close()
   }
})

app.listen(PORT, () => console.log('Server running on PORT ' + PORT))
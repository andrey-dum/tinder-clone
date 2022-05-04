const PORT = 8000

const express = require('express')
const { MongoClient } = require('mongodb')
const  cors = require('cors')
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

        const existingUser = await users.findOne({email})

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

        const token = jwt.sign(isertedUser, sanitizedEmail, {
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

app.post('/login', async (req, res) => {

    const client = new MongoClient(uri);
    const {email, password} = req.body;

    try {
        await client.connect()
        const db = client.db('tinder')
        const users = await db.collection('users')

        const user = await users.findOne({email})

        const isPasswordMatch = await bcrypt.compare(password, user.hashed_password)

        if(user && isPasswordMatch) {
            const token = jwt.sign(user, email, {
                expiresIn: 60 * 24
            })

            res.status(201).json({
                token,
                userId: user.user_id,
                email: user.email
            })
        }

        
        res.status(400).json({
            message: 'Invalid cred'
        })
      
   } catch (error) {
       console.log(error)
   } 
})

app.put('/user', async (req, res) => {

    const client = new MongoClient(uri);
    const formData = req.body.formData;

    try {
        await client.connect()
        const db = client.db('tinder')
        const users = await db.collection('users')


        const query = { user_id: formData.user_id }
        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                show_gender: formData.show_gender,
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: formData.url,
                about: formData.about,
                matches: formData.matches
            }
        }

        const insertedUser = await users.updateOne(query, updateDocument)
        res.send(insertedUser)

        
        // res.status(400).json({
        //     message: 'Invalid cred'
        // })
      
   } catch (error) {
       console.log(error)
   } finally {
       await client.close()
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
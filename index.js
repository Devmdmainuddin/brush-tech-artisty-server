const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 4000


app.use(cors());
app.use(express.json());


//const uri = "mongodb+srv://brush-tech-artisty-server:2k0opfAOxGN9Kidh@cluster0.jgwprpb.mongodb.net/";
const uri = `mongodb+srv://brush-tech-artisty-server:2k0opfAOxGN9Kidh@cluster0.jgwprpb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        
        // await client.connect();
        const artAndCraftCollection = client.db("artAndCraftStore").collection("artAndCraft")
        const artandcraftUsers = client.db("artAndCraftStore").collection("users")
        const artandcraftCategorey = client.db("artAndCraftStore").collection("categorey")
        //...............................
        app.get('/artAndCraf', async (req, res) => {
            const carsor = artAndCraftCollection.find();
            const result = await carsor.toArray();
            res.send(result)
        })
       

        app.get('/artAndCraf/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await artAndCraftCollection.findOne(query)
            res.send(result);
        })
        // app.get("/artAndCraf/:category", async (req, res) => {
        //     const cat = req.params.category
        //       console.log(req.params.category);
        //       const result = await artAndCraftCollection.find({ category: cat }).toArray();
        //       console.log(result)
        //       res.send(result)
        //   })

        app.post('/addArtAndCraf', async (req, res) => {
            const art = req.body;
            console.log('properties', art)
            const result = await artAndCraftCollection.insertOne(art)
            res.send(result);
        })
        app.get('/categorey', async (req, res) => {
            const carsor = artandcraftCategorey.find();
            const result = await carsor.toArray();
            res.send(result)
        })
        app.post('/addCategorey', async (req, res) => {
            const art = req.body;
            console.log('properties', art)
            const result = await artandcraftCategorey.insertOne(art)
            res.send(result);
        })
        app.get("/myArtAndCraf/:email", async (req, res) => {
            
            console.log(req.params.email);
            
            const result = await artAndCraftCollection.find({ email: req.params.email }).toArray();
            res.send(result)
        })
        



      

        app.put('/artAndCraf/:id', async (req, res) => {
            const id = req.params.id;
            const craf = req.body;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updatecraf = {
                $set: {
                    title: craf.title,
                    image: craf.image,
                    price: craf.price,
                    category: craf.category,
                    description: craf.description,
                    description: craf.description,
                    stockStatus: craf.stockStatus,
                    rating: craf.rating,
                    customization: craf.customization,
                    processingTime: craf.processingTime,

                }
            };
            const result = await artAndCraftCollection.updateOne(filter, updatecraf, options);
            console.log(craf)
            res.send(result);
        })

        app.delete('/artAndCraf/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await artAndCraftCollection.deleteOne(query)
            res.send(result);
            console.log('delete', id)
        })

        // ............................

        app.get('/users', async (req, res) => {
            const carsor = artandcraftUsers.find();
            const result = await carsor.toArray();
            res.send(result)
        })

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await artandcraftUsers.findOne(query)
            res.send(result);
        })
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log('new user', user);
            const result = await artandcraftUsers.insertOne(user);
            res.send(result);
        });
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const users = req.body;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updateuser = {
                $set: {
                   
                    email: users.email,
                    createdAt: users.createdAt
                }
            };
            const result = await artandcraftUsers.updateOne(filter, updateuser, options);
            console.log(users)
            res.send(result);
        })
        app.patch('/user', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email }
            const updateDoc = {
                $set: {
                    lastLoggedAt: user.lastLoggedAt
                }
            }
            const result = await artandcraftUsers.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await artandcraftUsers.deleteOne(query)
            res.send(result);
            console.log('delete', id)
        })














        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send('Confirmed!')
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
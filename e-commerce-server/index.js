const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { default: axios } = require('axios')
const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors({
     origin: "https://e-commerce-8ba86.web.app",
    credentials: true
}));

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded())
const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;



    if (!token) {
        return res.status(401).send({ message: 'Unauthorized access: No token found' });
    }


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized access: Invalid token' });
        }
       

        req.user = decoded;
        next();
    });
};



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q2gnz40.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const db = client.db("wo-commerce");

        const userCollection = db.collection("user")
        const productCollection = db.collection("product")
        const categoryCollection = db.collection("category")
        const paymentCollection = db.collection("payment")
        const whislistCollection = db.collection("whislist")
        const supportCollection = db.collection("support")

        const verifyAdmin = async (req, res, next) => {
            const email = req.user?.email;

            if (!email) {
                return res.status(401).send({ message: 'Unauthorized' });
            }

            const user = await userCollection.findOne({ email });

            if (!user || user.role !== "admin") {
                return res.status(403).send({ message: 'Forbidden access' });
            }

            next();
        };

        app.post('/jwt', async (req, res) => {
            const { email } = req.body;
            const user = { email }
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
           
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            });
            res.send({ token });
        })
        app.post('/logout', (req, res) => {
            res.clearCookie('token', { maxAge: 0, sameSite: 'none', secure: false }).send({ success: true });
        });

        app.post('/users', async (req, res) => {
            try {
                const userData = req.body
                const result = await userCollection.insertOne(userData)
                return res.status(200).send(result)
            } catch (error) {
                return res.status(500).send(error.message)
            }
        })

        app.patch('/user', async (req, res) => {
            try {
                const email = req.query.email
                const updateInfo = req.body
                const filterInfo = {
                    $set: updateInfo
                }

                const result = await userCollection.updateOne({ email }, filterInfo)
                return res.status(200).send(result);


            } catch (err) {
                res.status(500).send(err.message)
            }

        })
        app.get('/role', async (req, res) => {
            try {
                const email = req.query.email
                const userRole = await userCollection.findOne({ email })
                if (!userRole) {
                    return res.status(404).send({ message: 'User not found' })
                }
                
                return res.status(200).send(userRole)
            } catch (err) {
                return res.status(500).send(err.message)
            }
        })
        app.post('/product', verifyToken, verifyAdmin, async (req, res) => {
            try {
                const productData = req.body
                const result = await productCollection.insertOne(productData)
                return res.status(200).send(result)
            } catch (error) {
                return res.status(500).send(error.message)
            }
        })

        app.post('/category', async (req, res) => {
            try {
                const categoryData = req.body
                const result = await categoryCollection.insertOne(categoryData)
                return res.status(200).send(result)
            } catch (error) {
                return res.status(500).send(error.message)
            }
        })

        app.get('/category', async (req, res) => {
            try {
                const result = await categoryCollection.find().toArray()

                return res.status(200).send(result)
            } catch (error) {
                return res.status(500).send(error.message)
            }
        })
        app.get('/products', async (req, res) => {
            try {
                const result = await productCollection.find().toArray()

                return res.status(200).send(result)
            } catch (error) {
                return res.status(500).send(error.message)
            }
        })
        app.patch('/product/:id',verifyToken,verifyAdmin, async (req, res) => {
            try {
                const id = req.params.id;


                if (!ObjectId.isValid(id)) {
                    return res.status(400).send({ message: "Invalid Object ID" });
                }

                const filter = { _id: new ObjectId(id) };
                const updatedDoc = req.body;

                const updateProcess = {
                    $set: {
                        name: updatedDoc.name,
                        category: updatedDoc.category,
                        price: parseFloat(updatedDoc.price),
                        oldPrice: updatedDoc.oldPrice ? parseFloat(updatedDoc.oldPrice) : 0,
                        discount: parseInt(updatedDoc.discount) || 0,
                        rating: parseFloat(updatedDoc.rating) || 0,
                        description: updatedDoc.description,
                        photo: updatedDoc.photo,
                        updatedAt: new Date().toISOString()
                    },
                };

                const result = await productCollection.updateOne(filter, updateProcess);

                if (result.matchedCount === 0) {
                    return res.status(404).send({ message: "Product not found" });
                }

                res.send(result);
            } catch (error) {
                
                res.status(500).send({ message: error.message });
            }
        });

        //order
        app.post('/orders/create', verifyToken, async (req, res) => {
            const paymentInfo = req.body
           
            const trxid = new ObjectId().toString()
            paymentInfo.transactionId = trxid;
            const initit = {
                store_id: "riyad695899e1bf6d8",
                store_passwd: "riyad695899e1bf6d8@ssl",
                total_amount: paymentInfo?.price,
                currency: 'BDT',
                tran_id: trxid,
                success_url: 'https://e-commerce-server-sable.vercel.app/success',
                fail_url: 'https://e-commerce-server-sable.vercel.app/fail',
                cancel_url: 'https://e-commerce-server-sable.vercel.app/cancel',
                ipn_url: 'https://e-commerce-server-sable.vercel.app/ipn',
                shipping_method: 'Courier',
                product_name: 'Computer.',
                product_category: 'Electronic',
                product_profile: 'general',
                cus_name: 'Customer Name',
                cus_email: `${paymentInfo.email}`,
                cus_add1: 'Dhaka',
                cus_add2: 'Dhaka',
                cus_city: 'Dhaka',
                cus_state: 'Dhaka',
                cus_postcode: '1000',
                cus_country: 'Bangladesh',
                cus_phone: '01711111111',
                cus_fax: '01711111111',
                ship_name: 'Customer Name',
                ship_add1: 'Dhaka',
                ship_add2: 'Dhaka',
                ship_city: 'Dhaka',
                ship_state: 'Dhaka',
                ship_postcode: 1000,
                ship_country: 'Bangladesh',
            };

            const isResponse = await axios({
                url: "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
                method: "POST",
                data: initit,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",

                },
            })
            // console.log(isResponse);
            const savaData = await paymentCollection.insertOne(paymentInfo)
            const gateWayPageUrl = isResponse?.data?.GatewayPageURL
            return res.send({ gateWayPageUrl })
        })
        app.post('/success', async (req, res) => {
            //success data
            const paymentSuccess = req.body
            
            //Validation
            const { data } =
                await axios.get(`https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?
                val_id=${paymentSuccess.val_id}&store_id=riyad695899e1bf6d8&store_passwd=riyad695899e1bf6d8@ssl`)

           
            if (data.status !== 'VALID') {
                res.redirect(`${CLIENT_URL}/payment/fail`);
            }
            else {
                const updatePayment = await paymentCollection.updateOne({
                    transactionId: data.tran_id
                }, {
                    $set: {
                        status: "success",
                    }
                })
                res.redirect(`${CLIENT_URL}/payment/success/${data.tran_id}`);
            }

        })

        app.post('/fail', async (req, res) => {
            res.redirect(`${CLIENT_URL}/payment/fail`);
        })
        app.post('/cancel', async (req, res) => {
            res.redirect(`${CLIENT_URL}`);
        })

        //get order from payment Collection

        app.get('/order', verifyToken, async (req, res) => {
            try {
                const email = req.query.email

                let query = {}
                if (email) {
                    query = { email: email }
                }
                const result = await paymentCollection.find(query).toArray()
              
                return res.status(200).send(result)

            } catch (err) {
                res.status(500).send(err.message)
            }
        })
        app.get('/allorder', verifyToken, verifyAdmin, async (req, res) => {
            try {

                const result = await paymentCollection.find().toArray()
               
                return res.status(200).send(result)

            } catch (err) {
                res.status(500).send(err.message)
            }
        })

        app.patch('/order/:id', async (req, res) => {
            try {
                const id = req.params.id
                const status = req.body
                const filter = { _id: new ObjectId(id) }
                const updateDoc = { $set: status }
                const updateStatus = await paymentCollection.updateOne(filter, updateDoc)
                return res.status(200).send(updateStatus)
            } catch (err) {
                res.status(500).send({ message: err.message });
            }
        })

        app.patch('/reviews', verifyToken, async (req, res) => {
            try {
                const { email, product } = req.query;
                const reviewData = req.body;
               
                const filterData = {

                    email: email,

                    productId: product

                }
                
                const updateDoc = {
                    $set: {
                        rating: reviewData.rating,
                        comment: reviewData.comment,
                        reviewData: reviewData.reviewDate
                    }
                }
                const updateStatus = await paymentCollection.updateOne(filterData, updateDoc)
                
                return res.status(200).send(updateStatus)
            } catch (err) {

            }
        })

        app.delete('/order/:id', async (req, res) => {
            try {

                const id = req.params.id
                const filter = { _id: new ObjectId(id) }
                const deleteOrder = await paymentCollection.deleteOne(filter)
                return res.status(200).send(deleteOrder)
            } catch (err) {
                res.status(500).send({ message: err.message });
            }
        })


        app.post('/wishlist', verifyToken, async (req, res) => {
            try {
                const whisList = req.body
                const result = await whislistCollection.insertOne(whisList)
                return res.status(200).send(result)
            } catch (err) {
                res.status(500).send({ message: err.message });
            }
        })

        app.get('/wishlist', verifyToken, async (req, res) => {
            try {
                const email = req.query.email
                const result = await whislistCollection.find({ userEmail: email }).toArray()
                
                return res.status(200).send(result)
            } catch (err) {
                res.status(500).send(err.message)
            }
        })

        app.delete(`/wishlist/:id`, verifyToken, async (req, res) => {
            try {
                const { id } = req.params
                const filter = { _id: new ObjectId(id) }
                const result = await whislistCollection.deleteOne(filter)
                return res.status(200).send(result)
            } catch (err) {
                res.status(500).send(err.message)
            }
        })

        app.post('/support', verifyToken, verifyAdmin, async (req, res) => {
            try {
                const supportData = req.body;

                const result = await supportCollection.insertOne(supportData);
                res.send(result);
            } catch (error) {
                res.status(500).send({ message: "Error updating support data" });
            }
        });
        app.get('/support', verifyToken,async (req, res) => {
            try {
                const result = await supportCollection.findOne();
                if (!result) {
                    return res.send({
                        email: "Not Set",
                        phone: "Not Set",
                        notice: "No active notice"
                    });
                }

                res.send(result);
            } catch (error) {
                res.status(500).send({ message: "Error fetching support data" });
            }
        });

        await client.db("admin").command({ ping: 1 });
       
    } finally {

        // await client.close();
    }
}
run().catch();


app.get('/', (req, res) => {
    
})

app.listen(port, () => {
    
})
const express = require('express');
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser"); 
const { MongoClient } = require("mongodb");
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
const data = [
	{
		"name": "Sybil Russell",
		"phone": "1-729-368-1168",
		"email": "duis.volutpat@google.net",
		"address": "P.O. Box 323, 6048 Diam Rd.",
		"list": 1,
		"country": "United States",
		"region": "East Region",
		"postalZip": "556571",
		"text": "enim mi tempor lorem, eget mollis lectus pede et risus.",
		"numberrange": 9,
		"currency": "$67.52",
		"alphanumeric": "SXJ52JLO0QC"
	},
	{
		"name": "Quinn Clay",
		"phone": "1-572-843-5390",
		"email": "sit.amet@google.org",
		"address": "868 Nunc. St.",
		"list": 1,
		"country": "Peru",
		"region": "Ilocos Region",
		"postalZip": "3572 RO",
		"text": "nibh. Quisque nonummy ipsum non arcu. Vivamus sit amet risus.",
		"numberrange": 6,
		"currency": "$31.25",
		"alphanumeric": "KDT37ETH8SF"
	},
	{
		"name": "Acton King",
		"phone": "1-861-141-7784",
		"email": "et.ultrices@aol.com",
		"address": "7794 Sit Av.",
		"list": 7,
		"country": "Nigeria",
		"region": "Castilla y León",
		"postalZip": "4826 YW",
		"text": "hendrerit id, ante. Nunc mauris sapien, cursus in, hendrerit consectetuer,",
		"numberrange": 3,
		"currency": "$11.61",
		"alphanumeric": "VBQ57VPE9HJ"
	},
	{
		"name": "India Pugh",
		"phone": "(171) 461-8715",
		"email": "ultricies.sem@outlook.edu",
		"address": "673-8267 Leo. Av.",
		"list": 9,
		"country": "Colombia",
		"region": "Punjab",
		"postalZip": "722232",
		"text": "luctus et ultrices posuere cubilia Curae Donec tincidunt. Donec vitae",
		"numberrange": 4,
		"currency": "$43.17",
		"alphanumeric": "GCC73VFF2ZL"
	},
	{
		"name": "Barclay Leon",
		"phone": "1-204-282-5875",
		"email": "rutrum@yahoo.couk",
		"address": "P.O. Box 183, 4515 A St.",
		"list": 13,
		"country": "Mexico",
		"region": "North Island",
		"postalZip": "68518",
		"text": "vel arcu eu odio tristique pharetra. Quisque ac libero nec",
		"numberrange": 1,
		"currency": "$55.29",
		"alphanumeric": "ETF52QHX0XF"
	}
]
async function main(){
    const uri = "mongodb+srv://javi:javi@cluster0.146wlbr.mongodb.net/?retryWrites=true&w=majority"
    const client = new MongoClient(uri)
    try{
        await client.connect()
		//  deleteMany(client,4)
		// await deleteOneRecord(client,"Mahnoor")
        console.log("connected")
		// await updateAll(client)
		// await updateByName(client,"Quinn Clay",{name: "Javeria",
		// phone : "90-39028e67"
		// })
		// await upsertDocument(client,"Javeria",{name: "Mahnoor",
		// phone : "90-39028e67"
		// })
		// await upsertDocument(client,"Ashfak",{
		// 	"name": "Mota",
		// 	"phone": "1-204-282-5875",
		// 	"email": "rutrum@yahoo.couk",
		// 	"address": "P.O. Box 183, 4515 A St.",
		// 	"list": 13,
		// 	"country": "Mexico",
		// 	"region": "North Island",
		// 	"postalZip": "68518",
		// 	"text": "vel arcu eu odio tristique pharetra. Quisque ac libero nec",
		// 	"numberrange": 1,
		// 	"currency": "$55.29",
		// 	"alphanumeric": "ETF52QHX0XF"
		// })
        // await findListingForMinListNumberAndCurrency(client,0)
        // // await  listDatabases(client);
        // await createListing(client,{name:"Mynae",call:"jdkd"})
        // await createMultipleListing(client,data)
    }catch(err){
        console.log(err)
    }finally{
        await client.close()
    }
}
async function findOneListingByName(client,nameOfListing){
    const result = await client.db("Cluster0").collection("users").findOne({name:nameOfListing})
    if(result){
        console.log(result)
    }else{
        console.log("No result matches!")
    }
   
}
async function findListingForMinListNumberAndCurrency(client,{ListNum=0}){
    const cursor = await client.db("Cluster0").collection("users")
    .find({list: {$gte: ListNum}})
    .sort({last:-1}).limit(5)
    const result = await cursor.toArray()
    if(result){ result.forEach(i=>console.log(i.name))}
    else{console.log("No result matches!")}
}
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
async function createListing(client, newListing){
   const result = await client.db("Cluster0").collection("listing and Reviews").insertOne(newListing)
   console.log(`new listing is created with following id:${result.insertedId}`)
}
async function createMultipleListing(client,docs){
    const result = await client.db("Cluster0").collection("users").insertMany(docs)
}
async function updateByName(client,searchValue, setValues){
	const result = await client.db("Cluster0").collection("users").updateOne({"name":searchValue},{$set: setValues})
	console.log(result)
}
async function upsertDocument(client,docIdentification,updateOrInsertDocument){
	const result = await client.db("Cluster0").collection("users").updateOne({"name":docIdentification},{$set: updateOrInsertDocument},{upsert: true})
	console.log(result)
}
async function updateAll(client){
	const result = await client.db("Cluster0").collection("users").updateMany(
		{student:{$exists: false}}
		,{$set:{student:"Working"}})
		console.log(result.matchedCount)
}
async function deleteOneRecord(client,query){
	const result = await client.db("Cluster0")
	.collection("users")
	.deleteOne({name:query})
}
async function deleteMany(client,q){
	const result = await client.db("Cluster0")
	.collection("users")
	.deleteMany({"numberrange":{$lt:q}})
}
main().catch(console.err)
app.listen(3001,()=>{
    console.log("running")
})


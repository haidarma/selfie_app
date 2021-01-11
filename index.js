const express = require('express');
const app = express();
const port = 3001;
const Datastore = require('nedb');

app.listen(port, () => {
    console.log('server is at http://localhost:3001' 
)});

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) =>  {

    //since we want to look for everything we leave {} blank
    //pass in error then data
    database.find({}, (err, data) => {

        if(err)
        {
            response.end();
            return;
        }
        response.json(data);
    });
});

app.post('/api', (request, response) =>  {
    //response.end(); you could just say this
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;

    database.insert(data);

    response.json({
        status: "success",
        timestamp: timestamp,
        latitude: data.lat,
        longitude: data.lon,
        photo: data.obj,
        picture: data.image64
    }); //required to end response
});
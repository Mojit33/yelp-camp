const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '608303aa4feb461e68d5bd6e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi repudiandae placeat fuga ipsam maxime velit aspernatur nam quisquam. Quae beatae optio voluptatibus nobis saepe blanditiis consectetur totam porro corporis aperiam.',
            price,
            geometry: { 
                type: "Point", 
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude,
             ] },
            images: [
                {
                  url: 'https://res.cloudinary.com/mojit/image/upload/v1622732143/YelpCamp/v7bartr5qfze1wuj1j8h.jpg',
                  filename: 'YelpCamp/v7bartr5qfze1wuj1j8h'
                },
                {
                  url: 'https://res.cloudinary.com/mojit/image/upload/v1622732143/YelpCamp/r0kwzf5jfmscyxbbax3n.jpg',
                  filename: 'YelpCamp/r0kwzf5jfmscyxbbax3n'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
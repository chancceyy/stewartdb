const db = require('mongoose')
const { mongoPass, mongoUser } = require('../config.json')

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}

module.exports = async () => {
    console.log('Hopes Bot is ONLINE!')    
    await db.connect(`mongodb+srv://Chance:JvQEDcZJFZt4kf2j@cluster0.vc2bu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, dbOptions)
    .then(console.log('MongoDB has connected!'))
    .catch(error => console.log(error))
}

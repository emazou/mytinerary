const mongoose = require('mongoose')
mongoose.connect(
    process.env.MONGO_URL,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
)
    .then(() => console.log('conneted to database successfully'))
    .catch(error => console.log(error))


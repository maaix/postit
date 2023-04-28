const mongoose = require('mongoose');
const dbConfig = 'mongodb+srv://max:max@cluster0.zphjbn9.mongodb.net/?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);
const connection = mongoose.connect(dbConfig,{
   useNewUrlParser: true,
   useUnifiedTopology: true,
   
})
.then(() => {
   console.log("DB conection successful");
})
.catch(err => {
   console.log(err.message);
})





module.exports = connection;
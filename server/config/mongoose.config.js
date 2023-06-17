const mongoose = require('mongoose');
const username = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD
const clusterurl = process.env.MONGO_CLUSTER

mongoose.connect(`mongodb+srv://${username}:${password}@${clusterurl}/riseCharacterPlanner`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Established a connection to the database'))
  .catch(err => console.log('Something went wrong when connecting to the database ', err));
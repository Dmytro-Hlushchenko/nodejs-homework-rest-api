import { mongoose } from 'mongoose';
import app from './app.js'

const DB_HOST = 'mongodb+srv://Dima:V4QGuv9T7pkkxbeA@cluster0.bwi6msn.mongodb.net/';
mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch(error => {
    console.log(error.mongoose);
    process.exit(1);
  });


// MongoDB: pass:V4QGuv9T7pkkxbeA login:Dima;
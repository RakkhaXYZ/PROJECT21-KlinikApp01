import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from './config/database.js';
import Skedule from './models/SchduleModels.js';
import SequelizeStore from 'connect-session-sequelize';
import Userrouter from './routes/Users.js';
import DokterRoute from './routes/Dokter.js'; 
import PasienRouter from './routes/Pasien.js';



dotenv.config();
const app = express();

// membuat store session 
const sessionStore = new SequelizeStore(session.Store);

const store = new sessionStore({
  db: db
});


// untuk mengecek apakah database terhubung 

// async function initializeDatabase(){
//   try {
//     await db.authenticate();
//     console.log('Database Connected..')

//     await db.sync({ alter: true});
//     console.log('Data dimodel telah dibuat ...')
//   } catch (error) {
//     console.log('Database tidak terhubung..', error);
//   }
// }

// initializeDatabase();
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: 'auto'
  }
}))


app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));


app.use(express.json());
app.use(fileUpload());

// membuat statik file agar image bisa diakses di browser
app.use(express.static("public"));
app.use(Userrouter);
app.use(DokterRoute);
app.use(PasienRouter);

app.listen(process.env.APP_PORT, ()=>{
console.log(`Server Running on http://localhost:${process.env.APP_PORT}`);
});
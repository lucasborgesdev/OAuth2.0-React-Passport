import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;



dotenv.config();

const app = express();

mongoose.connect(`${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log("Conexão com BD OK!")
});

//MIDDLEWARE
app.use(express.json());
app.use(cors({origin: "http://localhost:3000", credentials: true}))
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user:any, done:any) => {
  return done(null, user);
});

passport.deserializeUser((user:any, done:any) =>{
  return done(null, user);
})


passport.use(new GoogleStrategy({
  clientID: `${process.env.ID_CLIENTE_GOOGLE}`,
  clientSecret: `${process.env.CLIENTE_SECRET_GOOGLE}`,
  callbackURL: "/auth/google/callback"
},
function(accessToken: any, refreshToken: any, profile: any, cb: any) {
  // Chamada de requisição efetuada com sucesso!
  //Inserir do db

  console.log(profile);
  cb(null,profile);
}));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


app.get("/", (req,res) =>{
  res.send("Olá mundo !!!")
}
)

app.listen(4000, () => {
  console.log("Pai tá ON!")
})
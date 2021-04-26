import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;




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
});

// First Name
// Last Name
// Id of Oauth system



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

passport.use(new TwitterStrategy({
  consumerKey: "TWITTER_CONSUMER_KEY",
  consumerSecret: "TWITTER_CONSUMER_SECRET",
  callbackURL: "/auth/twitter/callback"
},
function(accessToken: any, refreshToken: any, profile: any, cb: any) {
  // Chamada de requisição efetuada com sucesso!
  //Inserir do db
  console.log(profile);
  cb(null,profile);
}));

passport.use(new FacebookStrategy({
  //clientID: "466559504470748",
  //clientSecret: "49faad6f279ff23f7e3f29b1afeb7fc1",
  clientID: `${process.env.ID_CLIENTE_FACEBOOK}`,
  clientSecret: `${process.env.CLIENTE_SECRET_FACEBOOK}`,
  callbackURL: "/auth/facebook/callback"
},
function(accessToken: any, refreshToken: any, profile: any, cb: any) {
  // Chamada de requisição efetuada com sucesso!
  //Inserir do db
  console.log(profile);
  cb(null,profile);
}));

passport.use(new GitHubStrategy({
  clientID: "fe7ead31c31b0152900c",
  clientSecret: "1f55f85a2519173c4fd7ac0c4cb95b67f3097433",
  callbackURL: "http://localhost:4000/auth/github/callback"
},
function(accessToken: any, refreshToken: any, profile: any, cb: any) {
  // Chamada de requisição efetuada com sucesso!
  //Inserir do db
  console.log(profile);
  cb(null,profile);
}));




passport.use(new InstagramStrategy({
  clientID: `${process.env.INSTAGRAM_CLIENT_ID}`,
  clientSecret: `${process.env.INSTAGRAM_CLIENT_SECRET}`,
  callbackURL: "http://localhost:4000/auth/instagram/callback"
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
    res.redirect('http://localhost:3000');
  });

  app.get('/auth/facebook',
  passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000');
  });

  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000');
  });

  app.get('/auth/github',
  passport.authenticate('github'));

  app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  app.get('/auth/instagram',
  passport.authenticate('instagram'));

  app.get('/auth/instagram/callback', 
  passport.authenticate('instagram', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000');
  });

  app.get("/", (req,res) =>{
    res.send("Olá mundo !!!")
  });

  app.get("/getuser", (req,res) => {
    
    res.send(req.user);
  })


  app.listen(4000, () => {
    console.log("Pai tá ON!")
});
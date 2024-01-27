const express = require("express");
const googleUserrouter = express.Router();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

const {GoogleUserModel}=require("../model/googleUser.model")


const clientid="851150601621-7ju3h6lsif6ja5odh82m6lcqc3c0sa7p.apps.googleusercontent.com"
const Clientsecret="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"




googleUserrouter.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));


googleUserrouter.use(session({
    secret:"iamtheboss",
    resave:false,
    saveUninitialized:true
}))


googleUserrouter.use(passport.initialize());
googleUserrouter.use(passport.session());


passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:Clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await GoogleUserModel.findOne({googleId:profile.id});

            if(!user){
                user = new GoogleUserModel({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });

                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});


// initial google ouath login
googleUserrouter.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

googleUserrouter.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/dashboard",
    failureRedirect:"http://localhost:3000/login"
}))

googleUserrouter.get("/login/sucess",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

googleUserrouter.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:3000");
    })
})


module.exports={googleUserrouter}
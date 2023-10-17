const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../database/schemas/user_schemas');
const {comparePassword} = require('../utils/helpers');

passport.serializeUser((user, done) => {
    console.log('Serializing user...');
    console.log(user);
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    console.log('Deserializing user...');
    console.log(id);
    try {
        const user = await User.findById(id);
        if (!user) throw new Error('User not found');
        done(null, user);
    } catch (err) {
        console.log(err);
        done(err, null);
    }
});

passport.use(
    new Strategy(
        {
            usernameField: 'email',
        },
        async (email, password, done) => {
            console.log(email);
            console.log(password);
            try {
                // check if email is valid
                if (!email || ! password) {
                    throw new Error('Missing credentials');
                }
                const userDB = await User.findOne({ email });
                if(!userDB) throw new Error('User not found');

                // check if password is valid
                const isValid = comparePassword(password, userDB.password);
                if (isValid) {
                    console.log('Authenticated successfully!');
                    //request.session.user = userDB;
                    //return response.send(200);
                    done(null, userDB);
                } else {
                    console.log('Failed to Authenticate.')
                    //return response.send(401)
                    done(null, null);
                }
            } catch (err) {
                console.log(err);
                done(err, null);
            }
        }
    )
);
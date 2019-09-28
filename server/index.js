const express = require('express'),
    Session = require('express-session'),
    bodyParse = require('body-parser'),
    mongoose = require('mongoose'),
    middleware = require('connect-ensure-login'),
    FileStore = require('session-file-store')(Session),
    config = require('./config/default'),
    flash = require('connect-flash'),
    port = 3333,
    app = express();

const node_media_server = require('./media_server'); 
const passport = require('./auth/passport');
const thumbnail_generator = require('./cron/thumbnails');
 
exports.User = mongoose.model('User', require('./database/UserSchema'));

mongoose.connect('mongodb://127.0.0.1/nodeStream' , { useNewUrlParser: true });

app.use(passport.initialize());
app.use(passport.session());
app.use(Session({
    store: new FileStore({
        path : './sessions'
    }),
    secret: config.server.secret,
    maxAge : Date().now + (60 * 1000 * 30)
}));
app.use(flash());
app.use('/login', require('./router/login'));
app.use('/register', require('./router/register'));
app.use('/streams', require('./routes/streams'));
app.use('/settings', require('./routes/settings'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(require('cookie-parser')());
app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json({extended: true}));

app.get('*', middleware.ensureLoggedIn(), (req, res) => {
    res.render('index');
});

app.listen(port, () => console.log(`App listening on ${port}!`));
node_media_server.run();
thumbnail_generator.start();
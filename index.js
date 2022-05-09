// Init Package
const express = require('express');
const ejsMate = require('ejs-mate');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');

// Models
const User = require('./models/user');

// Routes
const beliObatRoutes = require('./routes/beliObat');
const userRoutes = require('./routes/users');
const keranjangRoutes = require('./routes/keranjang');
const lokasiRoutes = require('./routes/lokasi');
const reviewRoutes = require('./routes/reviews');
const adopsiRoutes = require('./routes/adopsi');
const dokterRoutes = require('./routes/dokter');
const chatRoutes = require('./routes/chat');
const asuransiRoutes = require('./routes/asuransi');
// end Init Package

dotenv.config();

// Mongoose Started
mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("DBConnection Successfull!"))
    .catch((err) => console.log(err));
// end Mongoose Started

// Authentication configuration
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla bla'
}));
app.use(flash());

// Set Package
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// end Set Package

// Use Package
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// end Use Package

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// Routing User
app.use('/', checkUserAuth, userRoutes);
// Routing beliObat
app.use('/beliObat', checkUserAuth, beliObatRoutes);
// Routing Keranjang
app.use('/keranjang', checkUserAuth, keranjangRoutes);
// Routing Lokasi
app.use('/lokasi', checkUserAuth, lokasiRoutes);
// Routing Review
app.use('/lokasi/:id/reviews', checkUserAuth, reviewRoutes);
// Routing Adopsi
app.use('/adopsi', checkUserAuth, adopsiRoutes);
// Routing Dokter Mode
app.use('/dokter', checkUserAuth, dokterRoutes);
// Routing Chat
app.use('/chat', checkUserAuth, chatRoutes);
// Routing Asuransi
app.use('/asuransi', checkUserAuth, asuransiRoutes);
// Routing About Us
app.get('/aboutUs', checkUserAuth, async(req, res) => {
    res.render('aboutUs');
})

// Routing Main Index
app.get('/', checkUserAuth, async(req, res) => {
    user = {};
    let isDokter = false;
    if(req.user != undefined){
        const userId = req.user._id;
        const user = await User.findById(userId);
        isDokter = user.isDokter;
    }
    res.render('index', {isDokter});
})

app.all('*', checkUserAuth, (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Something went wrong!';
    res.status(statusCode).render('error', {err});
})

function checkUserAuth(req, res, next) {
    if (req.session.user) return next();
    return next(new NotAuthorizedError());
  }

// Use Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`APP IS LISTENING ON PORT ${port}`);
});
// end Use Port
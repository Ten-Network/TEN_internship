require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("express-flash");
const bcrypt = require("bcrypt");
const path = require("path");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require("passport-local-mongoose");
const { User } = require("./models/user");

// PORT NUMBER for the server
const PORT = process.env.PORT;

// Connect to MongoDB Database
const dbConnect = require("./dbConnect");
dbConnect();

// Initialise App
const app = express();

// CORS Configuration
app.use(cors({
    origin: ["http://localhost:3000", "https://interns-nu.vercel.app"], // Allowed origins
    credentials: true, // Allow credentials such as cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/resumes", express.static("resumes"));

// Initialize sessions
app.use(
    session({
        secret: process.env.SESSION_ENCRYPTION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: mongoStore.create({
            mongoUrl: process.env.DATABASE_URL,
            ttl: 14 * 24 * 60 * 60, // Session expiration
            autoRemove: "native",
        }),
    })
);

// Initialize passport session
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(
    new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            try {
                console.log("User attempting to log in...");
                const user = await User.findOne({ email });
                if (!user) return done(null, false);

                const passwordCompare = await bcrypt.compare(password, user.password);
                if (!passwordCompare) return done(null, false);

                return done(null, user);
            } catch (error) {
                return done(error, false);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});

app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

// Import all the routes
const user = require("./routes/users");
const auth = require("./routes/auth");
const company = require("./routes/company");
const job = require("./routes/job");
const profile = require("./routes/profile");
const internshipRoutes = require("./routes/internship");
const internshipApplyRoutes = require("./routes/userInternship");
const emailRouter = require("./routes/send-emails");

app.use("/user", user);
app.use("/auth", auth);
app.use("/company", company);
app.use("/jobs", job);
app.use("/internships", internshipRoutes);
app.use("/profile", profile);
app.use("/applyform", internshipApplyRoutes);
app.use("/send-email", emailRouter);


app.use((err, _, res, _next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    _next();
});

app.get("/assets/download-resume/:name", (req, res) => {
    try {
        res.status(200).download(path.join(__dirname, "resumes", req.params.name));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(PORT, err => {
    if (err) {
        console.log("SERVER RAN INTO AN ERROR: ", err);
        return err;
    }
    console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
});









// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const logger = require("morgan");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const flash = require("express-flash");
// const bcrypt = require("bcrypt");
// const path = require("path");
// const session = require("express-session");
// const mongoStore = require("connect-mongo");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const { User } = require("./models/user");

// // Initialize App
// const app = express();
// const PORT = process.env.PORT || 4000;

// // Database Connection
// const dbConnect = require("./dbConnect");
// dbConnect();

// // CORS Configuration
// app.use(cors({
//     origin: ["http://localhost:3000", "https://ten-internship.vercel.app"],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
// }));

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(logger("dev"));
// app.use(bodyParser.json());
// app.use("/resumes", express.static("resumes"));

// // Session Configuration
// app.use(
//     session({
//         secret: process.env.SESSION_ENCRYPTION_SECRET || "yoursecret",
//         resave: false,
//         saveUninitialized: false,
//         store: mongoStore.create({
//             mongoUrl: process.env.DATABASE_URL,
//             ttl: 14 * 24 * 60 * 60,
//             autoRemove: "native",
//         }),
//     })
// );

// // Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// // Passport Local Strategy
// passport.use(
//     new LocalStrategy(
//         { usernameField: "email" },
//         async (email, password, done) => {
//             try {
//                 const user = await User.findOne({ email });
//                 if (!user) return done(null, false, { message: "User not found" });

//                 const isMatch = await bcrypt.compare(password, user.password);
//                 if (!isMatch) return done(null, false, { message: "Incorrect password" });

//                 return done(null, user);
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (error) {
//         done(error, false);
//     }
// });

// // Routes
// const user = require("./routes/users");
// const auth = require("./routes/auth");
// const company = require("./routes/company");
// const job = require("./routes/job");
// const profile = require("./routes/profile");
// const internshipRoutes = require("./routes/internship");
// const internshipApplyRoutes = require("./routes/userInternship");
// const emailRouter = require("./routes/send-emails");

// app.use("/user", user);
// app.use("/auth", auth);
// app.use("/company", company);
// app.use("/jobs", job);
// app.use("/internships", internshipRoutes);
// app.use("/profile", profile);
// app.use("/applyform", internshipApplyRoutes);
// app.use("/send-email", emailRouter);

// app.get("/", (req, res) => {
//     res.send("Welcome to the API!");
// });

// // Error Handler
// app.use((err, _, res, _next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

// app.listen(PORT, () => {
//     console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
// });

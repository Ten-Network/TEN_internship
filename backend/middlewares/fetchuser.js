// // const fetchuser = (request, response, next) => {
// //     if (request.user) {
// //         // User is authenticated, proceed to the next middleware or route handler
// //         return next();
// //     }

// //     // User is not authenticated, redirect to login page or send an error response
// //     response.redirect('/login'); // Example redirect to the login page
// // }

// // module.exports = fetchuser

// const jwt = require('jsonwebtoken');
// const JWT_SECRET = 'cat'

// const fetchuser = (req, res, next) => {
//     //Get the user from the jwt token and add id to req object
//     const token = req.header("authtoken");
//     if (!token) {
//         return res.status(401).send({ error: "Please authenticate using a valid token" })
//     }
//     try {
//         const data = jwt.verify(token, JWT_SECRET);
//         req.user = data.user
//         next();
//     } catch (error) {
//         res.status(401).send({ error: "Please authenticate using a valid token" })
//     }
// }

// module.exports = fetchuser








// fetchuser.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'cat';

const fetchuser = (req, res, next) => {
    // Check the Authorization header for the token in Bearer format
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token from Bearer <token>
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Please authenticate using a valid token" });
    }
};

module.exports = fetchuser;

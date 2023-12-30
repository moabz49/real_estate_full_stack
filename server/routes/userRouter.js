import express from 'express';
import { createUser, bookVisit, cancelBooking, getAllBookings, getAllFavorites, toFav } from '../controllers/userCntrl.js';
import jwtCheck from '../config/auth0Config.js';

const router = express.Router();

// jwtCheck is used to ensure that only authenticated users through AUTH0 can have access to the createUser function. If a request to this route does not include a valid JWT, jwtCheck will send a 401 Unauthorized respons

router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:id", jwtCheck, bookVisit);
router.post("/allBookings", getAllBookings);
router.post("/removeBooking/:id", jwtCheck, cancelBooking);
router.post("/toFav/:rid", jwtCheck, toFav);
router.post("/allFav", jwtCheck, getAllFavorites);

export { router as userRoute };
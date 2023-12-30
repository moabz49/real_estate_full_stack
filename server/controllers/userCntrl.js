import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prismaConfig.js';

export const createUser = asyncHandler(async( req, res) => {
    // console.log("Creating a user");

    let {email} = req.body;
    const userExists = await prisma.user.findUnique({ where: {email: email}});
    if( !userExists) {
        const user = await prisma.user.create({ data: req.body });
        res.send({
            message: 'User registered successfully',
            user,
        });
    } else res.status(201).send({ message: "User already registered"})
});

export const bookVisit = asyncHandler(async (req, res) => {
    const { email, date } = req.body;
    const { id } = req.params;

    try {
      // 1.Check if the residency is already booked by the user
        const alreadyBooked = await prisma.user.findUnique({
            where : { email },
            select: { bookedVisits: true },
        });
        // 2. If already booked then throw error
        if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
            res.status(400)
            .json({ message: "This residency is already booked by you"});
        // 3. If not booked then push the residency to the bookedVisits [] of the user
        } else {
            await prisma.user.update({
                where: {email},
                data: { 
                  bookedVisits: {push: { id, date }},
                },
            });
            res.send("your visit is booked successfully"); 
            }
        } catch (err) {
            throw new Error(err.message);
        }
});

// Get all bookings of a User
export const getAllBookings = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
        const bookings = await prisma.user.findUnique({
            where: {email},
            select: { bookedVisits: true},
        });
        res.status(200).send(bookings);
    } catch (err) {
        throw new Error(err.message);
    }
});

export const cancelBooking = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { id }  = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {email},
            select: { bookedVisits: true},
        });

        const index = user.bookedVisits.findIndex((visit) => visit.id === id);
        // if index -1 in Array [] then booking does not exist
        if(index === -1) {
            res.status(404).json({ message: "Booking not found"});
        } else {
            user.bookedVisits.splice(index, 1);
            await prisma.user.update({
                where: {email},
                data: {
                    bookedVisits: user.bookedVisits,
                },
            });
            res.send("Booking cancelled Successfully");
        }
    } catch (err) {
        throw new Error(err.message)      
    }
});

// Add a property to the FAV list of a particular USER.
export const toFav = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { rid } = req.params;
  
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      
    //  Check if already in user favResidenciesID [] if true then remove from fav List []
      if (user.favResidenciesID.includes(rid)) {
        const updateUser = await prisma.user.update({
          where: { email },
          data: {
            favResidenciesID: {
              set: user.favResidenciesID.filter((id) => id !== rid),
            },
          },
        });
  
        res.send({ message: "Removed from favorites", user: updateUser });
        // esle we will will push the rid to the favResidenciesID --> add to the favourite[] for the user
      } else {
        const updateUser = await prisma.user.update({
          where: { email },
          data: {
            favResidenciesID: {
              push: rid,
            },
          },
        });
        res.send({ message: "Updated favorites", user: updateUser });
      }
    } catch (err) {
      throw new Error(err.message);
    }
});

export const getAllFavorites = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
        const favResd = await prisma.user.findUnique({
            where: {email},
            select: { favResidenciesID: true },
        });
        res.status(200).send(favResd);
   } catch (err) {
    throw new Error(err.message);
   }
});





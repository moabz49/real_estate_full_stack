import asyncHandler from "express-async-handler";
import { prisma } from '../config/prismaConfig.js';

// asyncHandler is a custom middleware function that simplifies error handling for asynchronous routes/controllers.
// It wraps the async function and automatically handles any errors that might be thrown during its execution.
// Internally, it catches any errors that occur within the provided async function and passes them to the 
// error handling middleware, allowing for cleaner and more centralized error handling in the application.
// The middleware that we will then use for Error handling will be placed in the controllers.
// such as making sure user isLogged in by using our jwtCheck MIDDLEWARE.

// Create residency.
export const createResidency = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        facilities,
        userEmail,
    } = req.body.data
    console.log(req.body.data);
    
    if (!userEmail) {
        throw new Error("User email is required");
    }
    try {
        const residency = await prisma.residency.create({
            data: {
                title,
                description,
                price,
                address,
                country,
                city,
                facilities,
                image,
                owner: {connect : { email: userEmail } },
            },
        });
        res.send({ message: "Residency created successfully", residency });
    } catch (err) {
    // So, in this scenario, the code specifically checks for this particular error code (P2002) and throws a more user-friendly error
    // message stating that a residency with the same address already exists. This allows for a more graceful handling of the error, 
    // providing clearer feedback to users or developers interacting with the system.
        if (err.code === "P2002") {
            throw new Error("A residency with this address already exists")
        }
        throw new Error(err.message);
    }
});

// To get all the residency in order of the newest added to the latest added residency.
export const getAllResidencies = asyncHandler(async (req, res) => {
    const residencies = await prisma.residency.findMany({
    // e, it orders the results by the createdAt field in descending order ("desc"), meaning the most recent residencies will be returned first.
        orderBy: {
            createdAt: "desc",
        },
    });
    console.log(residencies);
    res.send(residencies);
});

// Function to get a specific residency.
export const getResidency = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const residency = await prisma.residency.findUnique({
            where: {id},
        })
        res.send(residency);
    } catch (err) {
        throw new Error(err.message);
    }
})
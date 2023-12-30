import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRouter.js'; // Make sure the path is accurate
import { residencyRoute } from './routes/residencyRouter.js';
// Assuming userRoute and residencyRoute are defined elsewhere
const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use('/api/residency', residencyRoute);
app.use('/api/user', userRoute)
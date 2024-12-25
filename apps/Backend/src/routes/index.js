import { Router } from 'express';
import userRouter from './userRoutes.js';
import adminRouter from './adminRoutes.js';
import eventRouter from './eventRoutes.js';
import companyRouter from './companyRoutes.js';
import studentRouter from './studentRoutes.js';
const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use("/user", userRouter); // dev 
router.use("/admin", adminRouter); //uday
router.use("/event", eventRouter); //shivam
router.use("/company", companyRouter); //akansha
router.use("/student", studentRouter); //naveen

export default router;
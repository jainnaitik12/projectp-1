import { Router } from 'express';
import userRouter from './userRoutes.js';
import adminRouter from './adminRoutes.js';
import eventRouter from './eventRoutes.js';
import companyRouter from './companyRoutes.js';
import studentRouter from './studentRoutes.js';
import jobRoutes from './jobRoutes.js';
const router = Router();

router.get('/', (req, res) => {
    res.send('Api is working');
});

router.use("/user", userRouter); // dev 
router.use("/admin", adminRouter); //uday
router.use("/event", eventRouter); //shivam
router.use("/company", companyRouter); //akansha
router.use("/jobroutes", jobRoutes);
// router.use("/application", applicationRoutes);
router.use("/student", studentRouter); //naveen
router.use("/job", jobRoutes);//akarshit


export default router;
import express from 'express';
import { createUser,Login, Me, logout, getAlluser, updateUser} from '../controllers/Users.js';
import { verifyUser } from '../middleware/AuthUser.js';



const router = express.Router();

router.post('/users', createUser);
router.post('/userLogin',Login);
router.get('/Me', verifyUser,Me);
router.get('/users', verifyUser,getAlluser);
router.delete('/logout', logout);
router.patch('/updateUser/:id', verifyUser, updateUser)




export default router;
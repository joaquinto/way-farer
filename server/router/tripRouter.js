import express from 'express';
import tripController from '../controller/tripController';
import authentication from '../middleware/authentication';
import validator from '../middleware/validator';
import jwtUtils from '../helpers/jwtTokenUtils';

const router = express.Router();

const { createTrip } = tripController;
const { verifyToken } = jwtUtils;
const { isAdmin, isBusExist } = authentication;
const { tripValidation } = validator;

router.post('/trips', tripValidation, verifyToken, isAdmin, isBusExist, createTrip);

export default router;
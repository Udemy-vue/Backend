import express from 'express';
import { body } from 'express-validator';
import * as authControll from '../controllers/authControll.js';
import { validationResultExpress } from '../middlewares/Validation.js';
import { requireToken } from '../middlewares/requireAuth.js';
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js';
import { bodyLoginValidator, bodyRegisterValidator } from '../middlewares/validatorManager.js';

// console.log('hola mundo')
// router.get("/login", authControll.getlogin);

// router.get('/register', authControll.getregister);

// router.post("/login", 
// 	[
// 		body('email', "Formato de email incorrecto")
// 			.trim()
// 			.isEmail()
// 			.normalizeEmail(),

// 		body('password', "Formato de Contraseña Incorrecta")
// 			.isLength({ min: 6 })
// 	],
// 	validationResultExpress,
// 	authControll.postlogin);


// router.post('/register', 
// 	[
// 		body('email', "Formato de email incorrecto")
// 			.trim()
// 			.isEmail()
// 			.normalizeEmail(),
		
// 		body('password', "Formato de Contraseña Incorrecta")
// 			.isLength({ min: 6 })
// 			.custom((value, {req}) => {
// 				if(value !== req.body.repassword){
// 					throw new Error('No coinciden las contraseñas')
// 				}
// 				return value;
// 			})
// 	],
// 	validationResultExpress,
// 	authControll.postregister);

 const router = express.Router();

router.post("/login", 
	bodyLoginValidator,
	validationResultExpress,
	authControll.postlogin);

router.post('/register', 
	bodyRegisterValidator,
	validationResultExpress,
	authControll.postregister);

router.get('/protected', requireToken, authControll.infoUser );

router.get('/refresh', requireRefreshToken, authControll.refeshToken );

router.get('/logout', authControll.logout);

export default router;
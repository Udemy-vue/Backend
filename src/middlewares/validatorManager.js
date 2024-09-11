import { body, param } from 'express-validator';
import { validationResultExpress } from '../middlewares/Validation.js';
import axios from 'axios';

export const bodyRegisterValidator = [
	body('email', "Formato de email incorrecto")
			.trim()
			.isEmail()
			.normalizeEmail(),
		
		body('password', "Formato de Contraseña Incorrecta")
			.isLength({ min: 6 })
			.custom((value, {req}) => {
				if(value !== req.body.repassword){
					throw new Error('No coinciden las contraseñas')
				}
				return value;
			})
];

export const bodyLoginValidator = [
	body('email', "Formato de email incorrecto")
		.trim()
		.isEmail()
		.normalizeEmail(),

	body('password', "Formato de Contraseña Incorrecta")
		.isLength({ min: 6 })
];

export const bodyLinkValidatos = [
	body('longLink', 'formato link incorrecto')
		.trim()
		.notEmpty()
		.isURL({require_protocol: true})
		.custom(async (value) => {
			try {
				if (!value.startsWith('https://')) {
					// statement
					value = 'https://' + value;
				}
				await axios.get(value);
				return value;
			} catch (e) {
				// statements
				throw new Error('Not found longlink 404');
			}
		})
];

export const paramsLinkValidator = [
	param('id', "Formato no válido (expressValidator)")
		.trim()
		.notEmpty()
		.escape()
];
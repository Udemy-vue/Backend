import jwt from 'jsonwebtoken';
import { TokenErrors } from '../utils/generateToken.js';

// export const requireToken = (req, res, next) => {
// 	try {
// 		// console.log(JSON.parse(req.headers).autorization);
// 		var token = req.cookies.token;

// 		if(!token || token.toLowerCase() === 'null') {
// 			throw { code: 12000 };
// 			// throw new Error('No exite el token en el header usa BEARER');
// 		}

// 		const payload = jwt.verify(token, process.env.JWT_SECRET);

// 		req.uid = payload.uid;

// 		next();

// 	} catch(e) {
// 		// statements
// 		// console.log(e);

// 		if (e.code === 12000) {
// 			return res.status(403).json({error: 'No existe el token'});
// 		}

// 		const TokenErrors = {
// 			"invalid signature": "La firma del JWT no es válida",
// 			"jwt expired": "JWT expirado",
// 			"invalid token": "Token no válido",
// 			"No Bearer": "Utiliza formato Bearer",
// 			"jwt malformed": "JWT formato no valido"
// 		}

// 		return res
// 			.status(401)
// 			.send({ error: TokenErrors[e.message] || 'Error desconocido en el token' });
// 	}
// }


// import jwt from 'jsonwebtoken';

export const requireToken = (req, res, next) => {
	try {

		var token = req.headers?.authorization;

		// console.log(token)
		token = token.split(" ")[1];

		if(!token || token.toLowerCase() === 'null') {
			throw { code: 12000 };
			// throw new Error('No exite el token en el header usa BEARER');
		}
		// console.log(token)
		// console.log('hosmnsdfjhjaksddhfuiasrhdfui')
		const payload = jwt.verify(token, process.env.JWT_SECRET);

		// console.log(payload)
		req.uid = payload.uid;

		next();

	} catch(e) {
		// statements
		// console.log(e);

		if (e.code === 12000) {
			return res.status(403).json({error: 'No existe el token'});
		}

		// const TokenErrors = {
		// 	"invalid signature": "La firma del JWT no es válida",
		// 	"jwt expired": "JWT expirado",
		// 	"invalid token": "Token no válido",
		// 	"No Bearer": "Utiliza formato Bearer",
		// 	"jwt malformed": "JWT formato no valido"
		// }

		return res
			.status(401)
			.send({ error: TokenErrors[e.message] || 'Error desconocido en el token' });
	}
}
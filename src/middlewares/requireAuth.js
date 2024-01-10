import jwt from 'jsonwebtoken';

export const requireToken = (req, res, next) => {
	try {
		// console.log(JSON.parse(req.headers).autorization);
		var token = req.headers?.authorization;
		console.log(token)
		
		if(!token) throw new Error('No exite el token en el header usa BEARER');

		token = token.split(" ")[1];

		const payload = jwt.verify(token, process.env.JWT_SECRET);
		// console.log(payload.uid);

		req.uid = payload.uid;

		next();
	} catch(e) {
		// statements
		console.log(e);
		const TokenErrors = {
			"invalid signature": "La firma del JWT no es válida",
			"jwt expired": "JWT expirado",
			"invalid token": "Token no válido",
			"No Bearer": "Utiliza formato Bearer",
		}

		return res
			.status(401)
			.send({ error: TokenErrors[e.message] })
	}
}
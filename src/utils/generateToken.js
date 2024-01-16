import jwt from 'jsonwebtoken';

export const generateToken = (uid) => {

	const expiresIn = 60*45;

	try {
		const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
		return { token, expiresIn };
	} catch(e) {
		// statements
		console.log(e);
	}
}

export const generateRefresheToken = (uid, res) => {
	const expiresIn = 60 * 60 * 24 * 30;

	try {
		const refeshToken = jwt.sign({uid}, process.env.JWT_REFERSH, {expiresIn});

		res.cookie('refeshToken', refeshToken, {
			httpOnly: true,
			secure: !(process.env.MODO === 'developer'),
			expires: new Date(Date.now() + expiresIn * 1000)
		});
	} catch(e) {
		// statements
		console.log(e);
	}
}

export const TokenErrors = {
  "invalid signature": "La firma del JWT no es válida",
  "jwt expired": "JWT expirado",
  "invalid token": "Token no válido",
  "No Bearer": "Utiliza formato Bearer",
  "jwt malformed": "JWT formato no valido"
}
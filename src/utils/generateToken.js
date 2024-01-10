import jwt from 'jsonwebtoken';

export const generateToken = (uid) => {

	const expiresIn = 60*15;

	try {
		const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
		return { token, expiresIn };
	} catch(e) {
		// statements
		console.log(e);
	}
}
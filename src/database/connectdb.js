import mongoose from 'mongoose';

try {
	// statements
	mongoose.connect(process.env.MONGO_URI)
	console.log('conexion establecida');
} catch(e) {
	// statements
	console.log('Error de conexion a mongodb:' + e);
}
import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const linkShema = new Schema({
	longLink: {
		type: String,
		requered: true,
		trim: true,
	},

	nanoLink: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	uid: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true
	}
}); 

export const Link = model('Link', linkShema)
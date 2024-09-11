import { Link } from '../models/Link.js';
import { nanoid } from 'nanoid';

export const getLinks = async ( req, res ) => {
	try {

		const links = await Link.find({uid: req.uid});

		return res.json({ links });
		
	} catch(e) {
		// statements
		console.log(e);
		return res.status(500).json({ error: 'error del servidor '});
	}
};

export const createLink = async ( req, res ) => {
	try {
		let { longLink } = req.body;

		if (!longLink.startsWith('https://')) {
			// statement
			longLink = 'https://' + longLink;
		}
		const links = new Link({ 
			longLink: longLink,
			nanoLink: nanoid(6),
			uid: req.uid
		});
		const newLink = await links.save();
		return res.status(201).json({ newLink });
	} catch(e) {
		// statements
		console.log(e);
		return res.status(500).json({ error: 'error del servidor '});
	}
}

export const getLinkV2 = async (req, res) => {
	try {
		const { nanoLink } = req.params;
		// const { id } = req.params;
		let link = await Link.findOne({nanoLink});
		if(!link) throw { code: 11000 };
		// if(link.uid.toString() != req.uid) throw { code: 12000 };
		return link.longLink;
	} catch(e) {
		return  answer(res, e);
	}
}

export const getLinkes = async (req, res) => {
	try {
		const longLink = await getLinkV2(req,res);
        // console.log(longLink);
        return res.json({longLink: longLink});
	} catch(e) {
		return  answer(res, e);
	}
}

export const getLink = async (req, res) => {
	try {
		const { id } = req.params;
		let link = await Link.findById(id);
		if(!link) throw { code: 11000 };
		if(link.uid.toString() != req.uid) throw { code: 12000 };
		return res.json({ link });
	} catch(e) {
		return  answer(res, e);
	}
}

export const removeLink = async (req, res) => {
	try {
		const { id } = req.params;
		const link = await Link.findById(id);
		if(!link) throw { code: 11000 };
		if(link.uid.toString() != req.uid) throw { code: 12000 };
		await link.deleteOne();
		return res.json({ link });
	} catch(e) {
		return answer(res, e);
	}
};

function answer(res, e) {
	// console.log(e.code);
	if (e.code === 11000) {
		return res.status(404).json({error: 'No existe el link '});
	} else if (e.code === 12000) {
		return res.status(404).json({error: 'No pertenece el id :,-('});
	} else {
		if (e.kind === 'ObjectId') {
			return res.status(403).json({error: 'Formato id Incorrecto'});
		}
		return res.status(500).json({error: 'error del servidor '});
	}
}

export const updateLink = async (req,  res) => {
	try {
		console.log('hola mundo.......')
		const { id } = req.params;
		let { longLink } = req.body;
		console.log( longLink );
		if (!longLink.startsWith('https://')) {
			longLink = 'https://' + longLink;
		}
		const link = await Link.findById(id);
		if(!link) throw { code: 11000 };
		if(!link.uid.equals(req.uid)) throw { code: 12000 };
		link.longLink = longLink;
		await link.save();
		return res.json({ link });
	} catch(e) {
		answer(res,e);
	}
};
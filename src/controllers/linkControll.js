import { Link } from '../models/Link.js';
import { nanoid } from 'nanoid';

export const getLinks = async ( req, res ) => {
	try {
		
		const links = await Link.find({ uid: req.uid })

		return res.json({ links });
		
	} catch(e) {
		// statements
		console.log(e);
		return res.status(500).json({ error: 'error del servidor '});
	}
};

export const createLink = async ( req, res ) => {
	try {
		var { longLink } = req.body;

		if (!longLink.startsWith('https://')) {
			// statement
			longLink = 'https://' + longLink;
		}

		const links = new Link({ 
			longLink: longLink, 
			nanoLink: nanoid(6), 
			uid: req.uid 
		});

		// console.log(links);
		const newLink = await links.save();
		return res.status(201).json({ newLink });

	} catch(e) {
		// statements
		console.log(e);
		return res.status(500).json({ error: 'error del servidor '});
	}
}

export const getLink = async (req, res) => {
	try {
		// console.log('haiudfhiausdhfuias')
		const { id } = req.params;
		// console.log(id);
		const link = await Link.findById(id);

		if(!link) throw { code: 11000 };

		if(link.uid.toString() != req.uid) throw { code: 12000 };
			
		return res.json({ link });
		
	} catch(e) {
		// statements
		// console.log(e);
		switch (e.code) {
			case 11000:
				return res.status(404).json({ error: 'No existe el link '});
				break;

			case 12000:
				return res.status(404).json({ error: 'No pertenece el id :,-('});
				break;

			default:
				if (e.kind === 'ObjectId') {
					return res.status(403).json({ error: 'Formato id Incorrecto'});
				}
				// console.log('aljksdhfkjasdhfasdhqwrhuwer')
				return res.status(500).json({ error: 'error del servidor '});
				break;
		}
		return res.status(500).json({ error: 'error del servidor '});
	}
}

export const removeLink = async (req, res) => {
	try {
		// console.log('haiudfhiausdhfuias')
		const { id } = req.params;
		// console.log(id);
		const link = await Link.findById(id);

		if(!link) throw { code: 11000 };

		if(link.uid.toString() != req.uid) throw { code: 12000 };
		
		await link.deleteOne();
		
		return res.json({ link });
		
	} catch(e) {
		// statements
		// console.log(e);
		switch (e.code) {
			case 11000:
				return res.status(404).json({ error: 'No existe el link '});
				break;

			case 12000:
				return res.status(404).json({ error: 'No pertenece el id :,-('});
				break;

			default:
				if (e.kind === 'ObjectId') {
					return res.status(403).json({ error: 'Formato id Incorrecto'});
				}
				// console.log('aljksdhfkjasdhfasdhqwrhuwer')
				return res.status(500).json({ error: 'error del servidor '});
				break;
		}
		return res.status(500).json({ error: 'error del servidor '});
	}
}
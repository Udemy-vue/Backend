import {getLinkV2} from "./linkControll.js";

export const redirectLink = async (req, res) => {
    try {
        const longLink = await getLinkV2(req,res);
        // console.log(longLink);
        return res.redirect(longLink);
    } catch (e) {
        console.log(e);
    }
}


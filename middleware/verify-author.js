import Hoot from '../models/model-hoot.js';

// compare logged in user to the hoots owner
const verifyAuthor = async (req, res, next) => {

    try {

        const hoot = await Hoot.findById(req.params.hootId);

        if (req.user._id !== hoot.author) {
            return res.status(401).json({ error: "Unauthorized!"});
        }

        next();

    } catch (err) {

        res.status(401).json({ err: "We have an issue" });

    }

}

export { verifyAuthor }
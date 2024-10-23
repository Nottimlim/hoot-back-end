/* --------------------------------Imports--------------------------------*/

import Hoot from '../models/model-hoot.js';


/* --------------------------------GET Controllers--------------------------------*/


/* --------------------------------POST Controllers--------------------------------*/

const createComment = async (req, res) => {

    try {

        // find the hoot by id
        const hoot = await Hoot.findById(req.params.hootId);

        // define the author
        req.body.author = req.user._id;

        // push the comment
        hoot.comments.push(req.body);

        // save
        await hoot.save();

        // return
        res.status(201).json({ hoot });

    } catch(error) {

        res.status(400).json({ error: err.message });

    }

}

/* --------------------------------PUT Controllers--------------------------------*/

const updateHoot = async (req, res) => {

    try {

        const hoot = await Hoot.findByIdAndUpdate(req.params.hootId, req.body);
        res.status(201).json({ hoot });

    } catch(err) {

        res.status(400).json({ error: err.message });

    }

}

/* --------------------------------DELETE Controllers--------------------------------*/

const deleteHoot = async (req, res) => {

    try {

        const hoot = await Hoot.findByIdAndDelete(req.params.hootId);
        const hoots = await Hoot.find();
        res.status(201).json({ "deleted": hoot, hoots });

    } catch(err) {

        res.status(400).json({ error: err.message });

    }

}

/* --------------------------------Exports--------------------------------*/

export { createComment, updateHoot, deleteHoot }
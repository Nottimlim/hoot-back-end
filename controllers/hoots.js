/* --------------------------------Imports--------------------------------*/

import Hoot from '../models/model-hoot.js';

/* --------------------------------GET Controllers--------------------------------*/
const getHoots = async (req, res) => {
    
    try {
        const hoots = await Hoot.find({})
        .populate('author')
        .sort({ createdAt: 'desc' });
        res.status(200).json(hoots);
    } catch (error) {
        res.status(500).json(error);
    }
};


const getHoot = async (req, res) => {

    try {
        const hoot = await Hoot.findById(req.params.hootId).populate('author comments.author');
        res.status(200).json(hoot); 
    } catch (error) {
        res.status(500).json(error);
    }

};
    

/* --------------------------------POST Controllers--------------------------------*/

const createHoot = async (req, res) => {
    
    try {
        req.body.author = req.user._id;
        const hoot = await Hoot.create(req.body);
        hoot._doc.author = req.user;
        res.status(201).json(hoot);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

}


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
        res.status(201).json(hoot);

    } catch(error) {

        res.status(400).json({ error: err.message });

    }

}

/* --------------------------------PUT Controllers--------------------------------*/

const updateHoot = async (req, res) => {

    try {

        const hoot = await Hoot.findByIdAndUpdate(req.params.hootId, req.body);
        res.status(201).json(hoot);

    } catch(err) {

        res.status(400).json({ error: err.message });

    }

}

/* --------------------------------DELETE Controllers--------------------------------*/

const deleteHoot = async (req, res) => {

    try {

        const hoot = await Hoot.findByIdAndDelete(req.params.hootId);
        res.status(201).json(hoot);

    } catch(err) {

        res.status(400).json({ error: err.message });

    }

}

/* --------------------------------Exports--------------------------------*/

export { getHoots, getHoot, createHoot, createComment, updateHoot, deleteHoot }
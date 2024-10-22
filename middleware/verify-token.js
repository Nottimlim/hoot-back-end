import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    
    try {

        const token = req.headers.authorization.split(' ')[1];
        // adding in verify method
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (err) {

        res.status(401).json({ err: "We have an issue" });

    }

}

export { verifyToken }
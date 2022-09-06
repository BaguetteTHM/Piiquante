const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userID;
       req.auth = {
           userId: userId
       };
       console.log(decodedToken,token)
    if(req.body.userId && req.body.userId !== userId) {
        res.status(403).json({ message: 'Requête non autorisée' });
    } else {
        next();
    }
    } catch(error) {
       res.status(401).json({ error });
   }
};
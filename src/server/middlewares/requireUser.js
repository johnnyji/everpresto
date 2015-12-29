const requireUser = (req, res, next) => {
  if (req.session.userId) return next();
  res.status(401).json({message: 'Woah! We have to know who you are before you can see this, please log in!'});
};

export default requireUser;
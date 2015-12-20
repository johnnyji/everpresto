const requireUser = (req, res, next) => {
  debugger;
  if (req.session.userId) return next();

  res.status(401).json({message: 'Error. Please authenticate before performing this action.'});
};

export default requireUser;
const requireUser = (req, res, next) => {
  if (req.session.userId && req.session.companyId) return next();

  if (!req.session.userId) {
    return res.status(401).json({
      message: 'Woah! We have to know who you are before you can see this, please log in!'
    });
  }
  if (!req.session.companyId) {
    return res.status(401).json({
      message: 'Hmmm, we can\'t seem to find what company you\'re you. Try loging out and back in,'
    });
  }

  return res.status(401).json({message: 'Please authenticate yourself first!'});
};

export default requireUser;
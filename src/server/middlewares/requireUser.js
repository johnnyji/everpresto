const requireUser = (req, res, next) => {
  req.session.userId
    ? next()
    : res.redirect('/');
};

export default requireUser;
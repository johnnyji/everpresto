export default (req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
};

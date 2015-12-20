import express from 'express';
import mongoose from 'mongoose';
import Template from '.././models/template';
import requireUser from '.././middlewares/requireUser';

const Template = mongoose.model('Template');
const router = express.Router();

// Makes sure each route requires a user before execution
router.use(requireUser);

router.post('/create', (req, res, next) => {
  const {title, body, placeholders} = req.data.template;

  // TODO: Test to see if this works
  Template.create({
    owner: req.session.userId,
    title,
    htmlText,
    rawText,
    placeholders
  })
    .then((template) => res.status(201).json({template}))
    .catch((err) => res.status(422).json({message: err.message}));
});

export default router;
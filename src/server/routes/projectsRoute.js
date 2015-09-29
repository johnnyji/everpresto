import express from 'express';

import Project from '.././models/project';

const router = express.Router();

router.get('/', (req, res, next) => {
  Project.find({}, (err, projects) => {
    err 
      ? res.status(500).json(err)
      : res.status(200).json({ projects: projects });
  });
});


export default router;
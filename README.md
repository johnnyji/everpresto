# Everpresto

Automating the document signing process, cause you've got better things to do.

### Tech Stack

- React.js
- Redux
- Node.js
- MongoDB
- Rx.js
- Immutable.js
- Webpack
- SASS
- Flexbox

### Common Gotchas

**Why do reference id attributes on models not have a `ref` option?**
- If the `ref` option is provided. The reference id will not be loaded with with the document. The tradeoff to not using `ref` is that mongoose's `populate` function won't work. See https://github.com/Automattic/mongoose/issues/3020

**Why are models being required by `import` instead of `mongoose.model` in other model files?**
- The is a dependency loading issue. We might want to use `ModelB` in a static function of `ModelA`, now `ModelA` depends on `ModelB` to be loaded first; but what if `ModelA` is loaded before `ModelB`? This would throw a `MissingSchema` error. This type of cross dependency can get very complicated very fast - so when using models in other models, it's best to `import` from the direct source.

**Why are we using `Model.find` + `Model.save` in order to update vs. `Model.findOneAndUpdate` in some places?**
- Because `Model.save` is a Mongoose method, which means Mongoose Document `pre/post` hooks will be run every time `save` is called (this comes in especially handy in `Template.js`). `Model.findOneAndUpdate` and `Model.update` are actually MongoDB methods, so calling these will not invoke Mongoose Document hooks such as `pre('save')`. See https://github.com/Automattic/mongoose/issues/2672

**Why are we using `res.status(200).json({})` instead of `res.status(204).end()` when successfully closing a `delete` response?**
- This is because we're using the `fetch`. In fetch, data must be converted to JSON using `response.json()`. However, if the response is empty, `response.json()` throws an error. Therefore it's better to close the response with an empty object instead. `response.json()` also fails when the status code is `204`, this may be because `fetch` interperates `204` as an empty response. Therefore, we have to make due by using `200` instead. This is a necessary step to normalize data because there are some instances where we want to send back data after a succesful delete.

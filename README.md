# Everpresto

Automating the document signing process, cause you've got better things to do.

### Tech Stack

- React.js
- Redux
- Node.js
- MongoDB
- Immutable.js
- Webpack
- SASS
- Flexbox

### Common Gotchas

**Why do reference id attributes on models not have a `ref` option?**
- If the `ref` option is provided. The reference id will not be loaded with with the document. The tradeoff to not using `ref` is that mongoose's `populate` function won't work. See https://github.com/Automattic/mongoose/issues/3020

**Why are models being required by `import` instead of `mongoose.model` in other model files?**
- The is a dependency loading issue. We might want to use `ModelB` in a static function of `ModelA`, now `ModelA` depends on `ModelB` to be loaded first; but what if `ModelA` is loaded before `ModelB`? This would throw a `MissingSchema` error. This type of cross dependency can get very complicated very fast - so when using models in other models, it's best to `import` from the direct source.

**Why are `pre('save')` hooks on Mongoose Schemas not firing when using methods such as `Model.update` or `Model.findOneAndUpdate`?
- Methods such as `update` and `findOneAndUpdate` are direct MongoDB methods, which means although they're available from Mongoose, they are just simple passthroughs their Mongo counterparts. Therefore, Mongoose hooks don't apply to them (this isn't intuitive at all). There has been a patch since Mongoose 4.0.0 that fixes this, you can now specify `pre('update')` hook that will fire when `update` is called and `pre('findOneAndUpdate')` hook for catching `findOneAndUpdate`. See https://github.com/Automattic/mongoose/issues/964
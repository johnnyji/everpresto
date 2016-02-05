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
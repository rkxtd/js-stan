# Boilerplate for FE components

## package.json
Fields that should be populated:
- name
- description
- repository -> url
- keywords
- authors
- bugs -> url
- homepage

### scripts
gulp dev / webserver / release / watch
### browserify
In *dev* and *build* scripts browserify is used. The main entry file and dist file can be changed if needed. For the *build* task *browserify-shim* transformer and *browserify-derequire* plugin are used.

### tests
Tests are run with the karma. Basic karma.conf.json is added and files are transformed with browserify.

### browserify-shim
Browserify-shim is used to transfrom *jquery* and *undescore* require statements to the window.$ and window._ in the build file. For the development purposes they are added as devDependencies and are resolved by browserify automatically.

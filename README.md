# JS-Stan.

## Own js framework.
Based on Mediator & module approaches with loose coupling.

*Framework structure:*
Base Library -> Application Core -> Sandbox (Mediator) -> Modules

### scripts
gulp:
 - *clean* - Remove everything from dist folder
 - *dev* - Runs sequence:
    - clean
    - browserify
    - scripts
    - sprites
    - stylesheets
    - assets
    - sourcemap
 - *release*
    - clean
    - code-quality
    - browserify
    - scripts
    - karma
    - sprites
    - stylesheets
    - assets
    - sourcemap
    - jsdoc
 - *karma* - runs unit tests, and generate code coverage report
 - *watch* - runs livereload session, and watches src folder for changes
 - *webserver* - runs local web sever
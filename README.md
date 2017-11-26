# ifounded-landing-page
Coding exercise for iFounded, simple landing page build

If you have Node.js and Grunt CLI on your machine, than run `npm install` in the `src` folder.

Than run `grunt start` to view and modify the code in local developmnet environment.

## Building the distribution releases

To compile the minified HTML, CSS and copy assets to the `dist` folder, just run `grunt build` in the `src` folder.

Inlining the `above-the-fold-inlined.css` to the head has to be done manually, also have to repleace image paths, from `../images/` to `images/`, so they are relative to the HTML document.
// This code runs when 'app2' remote is loaded in any host.
// This is a good place to change some of the webpack internals.


// Here we are setting the webpack public path of this container.
__webpack_public_path__ = `${
  new URL(document.currentScript.src).origin
}/secure/app2/`;

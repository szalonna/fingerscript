fingerscript
============

Fingerprint and CoffeeScript
HTML5 based fingerprint part detection with hit-and-miss algorithm, created in CoffeeScript.

Drag and drop a picture of fingerprint and use the top buttons to manipulate the picture:
* Binarizálás: binarize the picture (only black or white pixels)
* Dilatáció: dilation, extends the size of black parts with 1 pixel
* Erodáció: erode, reduce the size of black part with 1 pixel
* Skeletonizálás: skeletonize, search the main line of black parts
* Jellemzők keresése: marking parts of fingerprint, currently line ends and crosses
* Jelzőpontok nélküli kép: removes marks

Magic
=====

Three main part:
* Main site: Handles drag'n'drop and drawing picture toa canvas.
* Web worker: Background thread which makes the main part of calculation, so the main site doesn't get blocked.
* Communication: Just strings can be passed between main site and worker, so serialize is the key.
(And a console emulation at web worker, but its not a big deal)


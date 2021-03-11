# Curveship.js Tutorial

## Getting Started
Start with downloading the directory containing the curveship source files ([curveship.js](../curveship.js), [verb.js](../verb.js),  and the [examples](../examples/) subdirectory). Make sure the file examples.css is in the example directory.
The base directory files are: curveship.js, verb.js. Ensure that a copy of examples.css in the examples subdirectory.

A curvship project, at minimum, exists as two files:
*  a javascript (.js) descriptor file that lists the actors, events, and objects for narration
*  a html wrapper (.html) that presents different narrative selections and the story output

## Start with example files and rename them
The easiest way to begin writing in curveship is to edit a copy of a sample javascript story file and corresponding html file wrapper. 
Ensure the files have coordinating names (e.g. redcarpet.js and redcarpet.html).  In a terminal window on linux or macOs, you would type:
<br>`cp example.js redcarpet.js`
<br>`cp example.html redcarpet.html`

If you are on windows, you would open up the command line (type 'cmd in the start menu and press enter). Then you type the following:
<br>`copy example.js redcarpet.js`
<br>`copy example.html redcarpet.html`


## Edit the wrapper file to point to your new story file.
 On line 9 of redcarpet.html, change the curveship source file to your new curvship javascript file. <br>
 From<br>
`<script src="example.js"></script>`
to<br>
`<script src="redcarpet.js"></script>`



## Edit the curveship descriptor file with your story elements.
Open redcarpet.js and change the descriptive fields within the quote marks. 

### Edit the metadata
Update the first few lines of the newtitle.js file.
Change the title field to your new title. Make sure to keep your fields encased in quotation marks.
Change the author and date.
Leave the example section until you are almost finished.

`var metadata = { title: "Red Carpet", author: "anjchang", date: "2021",`<br>
`instructions: "Simple example with two actors",`

For now, we leave the <b>examples</b> fields until after we're done adding the existents below.

### Edit the STORY objects (a.k.a. EXISTENTS)
Each element of a curveship story uses `objectName`.`propertyName` syntax. there are four basic existents:
* places
* actors
* things
* events.

Each propertyName that follows the objectName is a unique variable that identifies a particular place.

#### Edit the PLACES first
Each place object begins with the `place` objectname. 
`// PLACES first`<br>
`place.redcarpet = new Place("on the", "red carpet");`<br>
`place.pressroom = new Place("the", "press room");`<br>
#### Edit the ACTORS next
#### Edit the THINGS next
#### Edit the EVENTS last

### Leave the last two lines of the file intact.

`<var world = new World(place, actor, thing, eventSeq);`<br>
`function run() { narrate(metadata, {}, world); }`


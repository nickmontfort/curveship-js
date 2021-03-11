# Curveship.js Tutorial

## Getting Started
Start with downloading the directory containing the curveship source files ([curveship.js](../curveship.js), [verb.js](../verb.js),  and the [examples](../examples/) subdirectory). Make sure the file examples.css is in the example directory.
The base directory files are: curveship.js, verb.js. Ensure that a copy of examples.css in the examples subdirectory.

A curvship project, at minimum, exists as two files:
*  a javascript (.js) descriptor file that lists the actors, events, and objects for narration
*  a html wrapper (.html) that presents different narrative selections and the story output

## Start with example files and rename them
The easiest way to begin writing in curveship is to edit a copy of a sample javascript story file and corresponding html file wrapper. 
Ensure the files have  coordinating names (e.g. newtitle.js and newtitle.html). 
<br>`cp example.js newtitle.js`
<br>`cp example.html newtitle.html`

## Edit the wrapper file to point to your new story file.
 On line 9 of newtitle.html, change the curveship source file to your new curvship javascript file. <br>
 From<br>
`<script src="example.js"></script>`
to<br>
`<script src="newtitle.js"></script>`

## Edit the curveship descriptor file with your story elements.

### Edit the metadata
Update the first few lines of the newtitle.js file.
Change the title field to your new title. Make sure to keep your fields encased in quotation marks.
Change the author and date.
Leave the example section until you are almost finished.

### Edit the PLACES first
### Edit the ACTORS next
### Edit the THINGS next
### Edit the EVENTS last

### Leave the last two lines of the file intact.
`<var world = new World(place, actor, thing, eventSeq);
function run() { narrate(metadata, {}, world); }`


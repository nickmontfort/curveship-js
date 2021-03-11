# Curveship.js Tutorial

## Getting Started
Start with downloading the directory containing the curveship source files ([curveship.js](../curveship.js), [verb.js](../verb.js),  and the [examples](../examples/) subdirectory).
A curvship project, at minimum, exists as two files:
*  a javascript (.js) descriptor file that lists the actors, events, and objects for narration
*  a html wrapper (.html) that presents different narrative selections and the story output

## Start with an example files and rename them
The easiest way to begin writing in curveship is to edit a copy of a sample javascript story file and corresponding html file wrapper. 
Ensure the files have  coordinating names (e.g. newtitle.js and newtitle.html). 
<br>`cp example.js newtitle.js`
<br>`cp example.html newtitle.html`

## Edit the wrapper file to point to your new story file.
 On line 9 of newtitle.html, change the curveship source file to your new curvship javascript file. <br>
 From<br>
`<script src="example.js"></script>`
to<br>
`<script src="redcarpet.js"></script>`

# Curveship.js Tutorial

## Getting Started
You will need a text editor that displays line numbers, such as SublimeText, Notepad++, or Github's file edit window.

Start with downloading the directory containing the curveship source files ([curveship.js](../curveship.js), [verb.js](../verb.js),  and the [examples](../examples/) subdirectory). Make sure the file examples.css is in the example directory. You can also fork the curveship project into your own repository.
The necessary files are: curveship.js and verb.js in the base directory. Also, ensure that a copy of examples.css in the examples subdirectory.

A curvship project, at minimum, exists as two files:
*  a javascript (.js) descriptor file that lists the actors, events, and objects for narration
*  a html wrapper (.html) that presents different narrative selections and the story output

## Get familiar with curveship examples.
Open the different html files in the examples directory and click on the options to get a feel for the way curveship retells each story.

## Start with example files and rename them
If you look in the examples directory, you see that the files are paired. Each story javascript file  (ending with .js) corresponds to a hypertext file (ending with .html) The easiest way to begin writing in curveship is to edit a copy of a sample javascript story file and corresponding html file wrapper.  Pick an example (for example, prodigal.js and prodigal.html) and use that as a reference.

Copy a file pair consisting of a javascript and html file (e.g. redcarpet.js and redcarpet.html).  In a terminal window on linux or macOs, you would type:
<br>`cp prodigal.js redcarpet.js`
<br>`cp prodigal.html redcarpet.html`

If you are on windows, you would open up the command line (type 'cmd in the start menu and press enter). Then you type the following:
<br>`copy prodigal.js redcarpet.js`
<br>`copy prodigal.html redcarpet.html`

## Edit the HTML wrapper file to point to your new story file.
We will edit our new story files. On line 9 of redcarpet.html, change the curveship source file to your new curvship javascript file. <br>
 From<br>
`<script src="example.js"></script>`
to<br>
`<script src="redcarpet.js"></script>`

Also, change the title to reflect the story name.<br>
`<title>Red Carpet</title>`

Save and close the redcarpet.html file. 

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

Each propertyName that follows the objectName is a unique variable that identifies a particular place. See the [reference](reference.html) for more information on the existents.

#### Edit the PLACES first
Each unique place object begins with the `place` objectname.  There are two places in this story, a red carpet and a press room.

`// PLACES first`<br>
`place.redcarpet = new Place("on the", "red carpet");`<br>
`place.pressroom = new Place("the", "press room");`<br>

Each place has a view property, used to describe what the place looks like. The view specifies the place, and how it is described from a viewer's perspective.
`place.redcarpet.addView(place.redcarpet, "On the red carpet");`<br>
`place.pressroom.addView(place.pressroom, "From the press room");`<br>

#### Edit the ACTORS next
Now that we have a place (or places) where the story occurs, we can start to put actors in the scene.
Each unique actor object begins with the `actor` objectname.  There are two actors in this story, an actress and reporter.
To create the actor, we need to specify the spatial relationship they have in a specific place. We also need to designate the pronoun to use.

Here we create a female actress, who is on the redcarpet. We also create a male reporter in the press room.
`// ACTORS next`<br>
`actor.actress = new Actor("an", "actress", spatial.in, place.redcarpet, pronoun.feminine);`<br>
`actor.reporter = new Actor("a", "reporter", spatial.in, place.pressroom, pronoun.masculine);`<br>

#### Edit the THINGS next
We next add some things for the actors to interact with. 
Each unique thing object begins with the `thing` objectname. The relationship between the thing and the actors are defined.

In this story, there is a camera owned by the reporter and a purse possessed by actress.
`// THINGS next`<br>
`thing.camera = new Thing("a", "camera", spatial.on, actor.reporter);`<br>
`thing.camera.owner = actor.reporter;`<br>
`thing.purse = new Thing("a", "purse", spatial.on, actor.actress);`<br>
`thing.purse.owner = actor.actress;`<br>

 For more information about the different types of object relationships, please refer to the source for spatial prepositions in
[curveship.js](../curveship.js)

#### Edit the EVENTS last
Now that there is actors, objects, and places, it is time to add the events that unfold. The story events are declared as a series of "Event" objects.  Each event consists of an actor performing an action at a place or on a thing. The order of these events will determine the event order in the story narration.
`// Finally, EVENTS`<br>
`var APPEAR = new Event(actor.actress, "appear", place.redcarpet);`<br>
`var SHOOT = new Event(actor.reporter,"point", thing.camera);`<br>
`var MOVE = new Event(actor.reporter, "interview",actor.actress)`<br>

### Leave the last two lines of the file intact.
Once all the existents are declared, the last two lines are used by curveship to set up the narration and must not be changed.
`<var world = new World(place, actor, thing, eventSeq);`<br>
`function run() { narrate(metadata, {}, world); }`

### Edit the examples to be narrated.
Once the story elements are in place, set the narratrion parameters in the "examples" assignment field at the top of the js file.
In line 4, change the example properties to reflect the existents in the file. All the comma-separated fields after the assignment colon (`:`) describe different types of narrations that curveship will perform.

`examples: [ "i=reporter",`<br>
`"order=retrograde,you=actress,i=actress,event_numbers",`<br>
`"speaking=after,i=actor,order=random" ] };`<br>

THe narrations will now use the `reporter` and `actress` in the retellings. For more information about the different narrative options curveship can process, please refer to the source for <b>spin.order</b> in [curveship.js](../curveship.js)

Save and close the redcarpet.js file.

## Now, run  curveship. 
Open your curveship html file in a browser (e.g. Chrome or Firefox). If there are no errors, you will see the title of your story and a list of bulleted narration choices. Clicking on each of these options will perform different narrations. In this example, we have three narrations:
* `"i=reporter"` is the story told from the reporter's first person point-of-view.
* `"order=retrograde,you=actress,i=actress,event_numbers"` displays the events told in backwards order, told from the actress point-of-view to herself, and displaying the original number order.
* `"speaking=after,i=reporter,order=random"`  displays a random-ordered retelling in past-tense, told from the point-of-view of the reporter.

You can add more narrations by creating additional comma-separated fields to the <b>examples</b> assignment in the story js file (<b>redcarpet.js</b>). Make sure to close the parenthesis correctly with a closing square bracket `]` followed by a curly bracket `}`. 

That's it! 

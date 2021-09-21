# curveship-js

Online narrative variation, allowing author/programmers to have the same underlying story told interactively in different ways.

Curveship-js 0.4 is a system for automatic narrative variation: It can relate the same underlying events in different ways, expressing the same content via different narrative discourses. Curveship can tell events out of order, as with flashback. It can designate different characters as the narrator or narratee (the one telling or the one to whom the narrative is told), and, for instance, can tell the story from a standpoint before, during, or after the events themselves. More will hopefully be coming soon!

This system has an underlying representation of a content level or storyworld (with actors, things, places, and events) and is intended to implement narrative variation online. It can be used to tell the same underlying story in different ways, which was the main point of the original Curveship project from 2007. It is currently in a very preliminary state: This is version 0.4, which does only trivial referring expression generation (noun phrases only) and produces stock sentences from templates to represent events.

The system was originally developed with advanced users, such as researchers and author/programmers, in mind. While Curveship-js is now a much more preliminary implementation, it can be used for creative work and for teaching and learning about narrative theory. Programming a Curveship-js story file requires that an author follow some formal rules, but does not demand detailed knowledge of ES6, just a willingness to follow the Curveship-js framework as laid out in documentation and examples.

Some documentation, still evolving, is in the `doc` directory. Examples, as you might imagine, are in `examples`. To develop a variable narrative yourself, you can read the docs, study the examples, and then either start from scratch or begin my modifying an existing set of story and narrator files.

While the project overall is licensed via the GPL 3.0, the short example story files are each also provided under an all-permissive license.

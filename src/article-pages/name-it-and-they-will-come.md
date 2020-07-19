---
path: '/every-class-an-interface'
date: '2020-07-17'
title: 'Every Class An Interface'
---

There's a common wisdom I want to challenge. Or, really, the implementation of a common wisdom. The widsom being "prefer decoupled modules". The advice suggests that when two different modules (for example, classes) know little about each other, it becomes easier to make changes in one that do not affect the other. It clarifies the responsibilities of each class.

Examples matter more than words.
TODO: show an example of coupled code

```c#

```

TODO: show an example of that coupled code becoming decoupled

```c#

```

This kind of refactoring, in it's current magnitude, is inoffensive. I take no alarm at it.

But what eats at me is when I see people translate "decouple your code" into the something a little more specific, a little more dogmatic, like "prefer abstractions over implementations" or "code to interfaces instead of concrete objects".

I get it. I see where they're coming from. It feels "correct" that because `LunchCreator` really just depends on something that can provide burgers, you should swap it's dependency away from `BurgerCreator`, with all its disgusting implementation code, to `IBurgerCreator`, it's purer, stupider twin that only knows exactly what you need it to know. And I wouldn't even criticize this move if the author of `LunchCreator` had good reason to believe that she would want different concrete implementations injected at runtime (`CheeseburgerCreator : IBurgerCreator`, anyone?). Accepting different implementations of the same generic requirements is exactly what interfaces are great for.

As a more concrete example - Selenium uses this well with how they have a single `IWebDriver` interface that is implemented by several different web drivers, one for each browser. This lets you substitute in the same `IWebDriver` dependency into any calling code modules and easily swap out for different concrete classes to test different browsers with the same code. Gorgeous!

What becomes a problem, however, is when you get that giddy rush of "my code is clean now" and think ... what if everything just implemented an interface? That is, after all, how clean code is structured, right? Loose couplings, and I just loosened a coupling. My `LunchCreator` doesn't care about the implementation of whatever provides its fries, its drink, its burger - it just wants something that can do it. I'll just make each of these dependencies on an interface, and have my `DrinkCreator` and `FriesCreator` classes implement that interface. Nice, now my class has no gosh-darn clue what concrete objects it depends on. It's so stupid, and I love it for that.

But when you awaken from this dazed fog, this Clean Code-induced trance, you might notice something. Is your code, actually, "cleaner"? I won't try to argue for what clean means in this article, but for now we'll use a definition of "code that tells a story that is easy to understand", which I hope is not entirely disagreeable. Does the code really tell a clearer story? You might say it does - your `LunchCreator` was given intelligence it need not have - it did not need to know the lowly secret that `BurgerCreator` was what created its burgers, it only needed a class with a method to call that provided a burger.

But what are you ... actually ... getting from this? You _already had an inherent interface in `BurgerCreator`'s use of accessibility modifiers_ - if you make the interface's method (`GetBurger`) a public method on the class, and you make the methods that `BurgerCreator` only needs to call internally to be private, this gets you where you want. The class's accessibility modifiers provide an inherent API for what can be called. You already had everything you wanted - `BurgerCreator` was ready and willing to shield your beautiful `LunchCreator` class from its internal workings - you merely needed to ask.

"Well okay", you say. "But my `LunchCreator` _still knows_ that it depends on a concrete `BurgerCreator`, and it doesn't need to know that. It just needs to depend on something that can provide burgers". And you're right. But where is the actual damage in creating a dependency on this concrete object? Sure, fine, if there are many classes that may be used to create burgers, and you may want to use different types at runtime, go ahead with that `IBurgerCreator` dependency. But what are you actually getting from your clean code refactoring?

How is the code actually clearer? Is it really telling a better story to say "`LunchCreator` depends on something that can create burgers and implements `IBurgerCreator`" instead of "`LunchCreator` depends on a `BurgerCreator`"? To me, it's needlessly abstract. It dilutes the message, and I might even be misled into thinking that runtime substitutions are being used, when they may not be.

Your goals are sound. Your quest is righteous. It's okay to strive for decoupled logic. But thinking that every dependency needs to be some abstraction is wrong. There are absolutely use cases for this (providing a public API to a class library, runtime substitutions, mocking dependencies in languages that don't allow mocking of concrete types), but for a general goal of "clean code", your methods may be misguided.

The next time you refactor code to follow some nice-sounding, community-supported tip, ask yourself - how is this actually benefitting my story? Is this really what I want?

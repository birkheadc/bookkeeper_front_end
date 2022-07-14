# Book-keeper Front End

This is the front end for my simple book keeping application, built with React.

## Things I should do differently

As I'm nearing completion of the app, there are a number of places where I can recognize bad architecture that are beginning to cause problems.

The biggest is in the separation of duties between components and the main app itself.

All-in-all, it's good to recognize that each component should be responsible for handling it's own state, but I have taken this too far. There are a number of things that the app itself should keep track of, but instead each component is making an api call every time it is loaded. User Settings is a big pain point here, as I have now forced the app into the position of making an api call every time it needs to check a user setting, rather than saving those settings in local storage occasionally, and checking from there.

- I've begun work on this problem! The app now loads all settings when you log in, and re-stores them whenever you submit the settings form. However, some components have not yet been updated to use this, making api-calls of their own. Also, these stored user-settings include category names and calculator denominations, which are not properly updated when submitted, until the page is refreshed.
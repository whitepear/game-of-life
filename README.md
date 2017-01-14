This application is live at: https://whitepear.github.io/projects/react/conway/app/index.html

A React.js implementation of John Conway's 'Game of Life' - a reductionist mathematical simulation of life. Cells on a grid iteratively live, die or reproduce based on certain rules within the game. The user can stop, start and change the grid at any time. Initial grid-state is randomly determined on page load. The total number of grid changes, or generations, are tracked.

Each cell on the grid is represented by an individual React component. This is less performant than if the app were designed around a Canvas element, but provides an interesting insight into React's performance when rapidly manipulating 'standard' DOM elements in large numbers. Cells have been performance optimised through the implementation of shouldComponentUpdate within the application code.

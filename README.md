# 256 - A 2048 Clone.

## Description

256 is a clone of the game [2048](http://gabrielecirulli.github.io/2048/) showcasing a JavaScript interface independent of a backend and uses keyboard events to control the game play.

![homepage 256](https://www.dropbox.com/s/eu11nz7kz76k1ad/256.png?raw=1)

## Features

[Mousetrap.js](https://craig.is/killing/mice) was used to bind keyboard events for the game play. Other JavaScript libraries used to build out the interfaces were jQuery and Underscore.js.

## Install 256 locally

1. Fork the 256 repository to your GitHub account
1. Clone the repository in your account to your computer
1. The required JavaScript libraries are included in the repository

## Challenges

One of the biggest challenges was building the game logic. Consideration of the data structure and intended outcomes always needed to be a priority when determining how to implement the rules of the game. This was an exercise in testing logic one step at a time to create layers of a complex game. After the core logic of the game was completed in the collapseRight function, I was able to implement the same logic to the other keyboard directions with minimal changes to the code. Handling the edge cases and implementing how the game ends was also a challenge. To resolve these issues, it was helpful to explore the JavaScript language for helpful methods and to utilize helper methods that were readily available in the program.

With the interface, the biggest challenge I faced was to prevent the number tiles from expanding as the digits grew throughout the game. This would cause the columns of the game board to become offset and distract the user. After receiving some helpful suggestions, I used the `box-sizing` CSS property to maintain a consistent board through game play.

## Next Steps

The next steps for enhancing the game experience is to implement a score display and to store the game in LocalStorage so that it still shows up if the tab is closed. I would also like to create more effects using CSS3, optional themes and responsiveness for other devices.
# min-max-tic-tacs

"min-max-tic-tacs" is a simple, yet annoying implementation of Tic-Tac-Toe. Playing this game will activate close-to-zero dopamine receptors. :sparkles:

## Module pattern

My game contains three main modules: `gameField`, `gameController`, and `displayController`.

What are some advantages of the module pattern? Modules provide code encapsulation and prevent global namespace pollution.

In other words, modules can prevent spaghetti code! They allow me to organize my code by keeping the back-end isolated from the front-end. However, I can still pass functions and variables between modules as needed.

In addition, modules harden web apps against vulnerabilities, such as code injection. It would be difficult for someone to access my functions from the console or HTML input elements. To be fair, my static web app isn't a high value target for attackers, but dynamic web apps certainly are. It's best to incorporate security as early as possible in the [Software Development Life Cycle](https://en.wikipedia.org/wiki/Systems_development_life_cycle).

## What is the Minimax algorithm?

`minimaxLogic` is a sub-module of the `gameController`. It implements the famous [Minimax algorithm from zero-sum game theory](https://en.wikipedia.org/wiki/Minimax).

Theoretically, it can simulate 362,880 outcomes. This is made possible by recursion! By the time you've made your second move, `minimaxLogic` will have calculated all possible outcomes of the current game.

## Game tree

The game tree can be visualized like this:

![Game tree from GeeksforGeeks.com](https://media.geeksforgeeks.org/wp-content/uploads/TIC_TAC.jpg)
> Image from GeeksforGeeks.com

An expected loss is worth -10 points. An expected win is worth +10 points. An expected draw is worth 0 points. These are known as "terminal states". Terminal states are essentially the AI's plan to steal your dopamine.

For the efficiency police, time complexity is much lower than O(362,880) in this implementation because it only looks at empty squares as the game progresses. Branches of the game tree are ignored if they're irrelevant to the current game. This is also known as "pruning".

When implemented correctly, it's impossible to win against Minimax. It will nullify every single one of your moves. If you leave an opening, it won't hesitate to win against you.

Don't worry. We humans have a similar strategy! First, we focus on preventing immediate losses. If the opponent leaves an opening, we try to win. When all else fails, we can force a draw...

We, too, can prevent Minimax from winning. That way, neither of you get to have fun. :trollface:

### References

Thanks for reading. I had a blast while making this project. It helped me reinforce my understanding of data structures and algorithms in Javascript. Huge thanks to [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe), [GeeksforGeeks](https://www.geeksforgeeks.org/finding-optimal-move-in-tic-tac-toe-using-minimax-algorithm-in-game-theory/), and [FreeCodeCamp](https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37/) for helping me understand and implement Minimax!
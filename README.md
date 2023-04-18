# min-max-tic-tacs

"min-max-tic-tacs" is a simple, yet annoying game of Tic-Tac-Toe.

:sparkles: Playing this game will activate close-to-zero dopamine receptors. :sparkles:

## Module pattern

My game contains three primary modules: `gameField`, `gameController`, and `displayController`.

What are advantages of the module pattern? Modules provide code encapsulation and prevent global namespace pollution.

In other words, modules can prevent spaghetti code! They allow me to organize my code by keeping the front-end isolated from the back-end. This makes the code easier to read and maintain. I can still return functions and variables between modules as needed.

Modules can also provide security through obscurity. It would be somewhat difficult to modify the game logic from the console. To be fair, my game isn't a high value target for attackers, but dynamic web apps certainly are. It's best to incorporate security as early as possible in the [Software Development Life Cycle](https://en.wikipedia.org/wiki/Systems_development_life_cycle), even if it's just an extra layer of abstraction.

## What is the Minimax algorithm?

`gameController` contains a sub-module `minimaxLogic`, which implements the famous [Minimax algorithm from zero-sum game theory](https://en.wikipedia.org/wiki/Minimax).

Theoretically, Minimax can simulate all 362,880 game states of Tic-Tac-Toe. This is made possible by recursion! By the time you've made your second move, Minimax will have calculated all possible outcomes of the current game.

![Image of Garry Kasparov versus Deep Blue, 1997](https://i.insider.com/55947fbf2acae7b7188b5388?width=1000&format=jpeg&auto=webp)
<sub>Credit: BusinessInsider.com</sub>

In 1997, GM Garry Kasparov was defeated by IBM's supercomputer, named "Deep Blue".

Deep Blue's secret weapon? You guessed it:

*Minimax!*

## Strategy

In Tic-Tac-Toe, the game tree can be visualized like this:

![Game tree from NeverStopBuilding.com](https://images.squarespace-cdn.com/content/v1/5a0c6978bff2001ef7581170/1513544600041-LK94ONS0M8TSFUFCPPNB/full-minimax-move-tree.png?format=1500w)
<sub>Credit: NeverStopBuilding.com</sub>

An expected loss is worth -10 points. An expected win is worth +10 points. An expected draw is worth 0 points. These are known as "terminal states". Terminal states are essentially the AI's plan to steal your dopamine.

For the efficiency police, time complexity is O(b<sup>m</sup>), but this implementation only looks at empty squares as the game progresses. Branches of the game tree are ignored if they're irrelevant to the current game state. This is also known as "pruning".

When implemented correctly, it's impossible to win against Minimax. It will nullify every single one of your moves. If you leave an opening, it won't hesitate to win against you.

Dont, worry. We, too, can prevent Minimax from winning. That way, neither of you get to have fun. :trollface:

### References

Thanks for reading. I had a blast while making this project. It helped me reinforce my understanding of data structures and algorithms.

Huge thanks to [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe), [GeeksforGeeks](https://www.geeksforgeeks.org/finding-optimal-move-in-tic-tac-toe-using-minimax-algorithm-in-game-theory/), [NeverStopBuilding](https://www.neverstopbuilding.com/blog/minimax), and [FreeCodeCamp](https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37/) for helping me understand Minimax!

Also, Deep Blue did not only use Minimax against Garry Kasparov. It also used alpha-beta pruning (along with other techniques) to scrape by, because [processing power was limited compared to today's standards](https://web.stanford.edu/class/archive/cs/cs221/cs221.1186/sections/section5.pdf).
## Conways Game of Life
Its the famouse Game of Life by Conway written in Javascript with Babylon.js. 
For more information on "Game of Life" look at the wiki page https://en.wikipedia.org/wiki/Conway's_Game_of_Life.
For more information about Babylon.js visit the offical site with lots of great content http://www.babylonjs.com.


## Running the Code
A running version of the code can be found at http://185.82.21.82/gameoflife. But you can also run it on your device. Simply fire up the index.html file in any browser that supports webGL. 

## The Game & Controlls  
At the start screen, you can chose 2D or 3D. Select a grid size and what kind of shape you would like the cells to be represented as. Depending on your device be careful with very large numbers 
when chosing grid (like > 200x200). Your device will have a hard time rendering all the shapes.  
You can just let the game randomly chose the inital state of the cells or you can pick them by hand (Only for 2D Grid). Then simply hit "Enter".    
Chose some cells to be alive simply by clicking on it. Than start the game and see what you have created!   
The default Camera is a Arc Rotation Camera. It will always look at the center of the grid. To move the angles you have to move around your mouse while keeping left or right mouse key pressed any where on the screen.
To zoom in use the mouse wheel. By pressing "c" you can switch Camera to a Free Camera which can be moved with w,a,s,d and also the mouse while keeping one of the mouse keys pressed anywhere on the screen.   
The menu button is in the upper left corner. It contains a count of how many rounds the current game has been running, a Pause/Resume button and a Restart Button.
Also you can change the time intervall for every round and speed up or slow down the game.    
In the upper right corner is a mute button, in case you get annoyed by the great sounds the game is creating for you.    
Also in the upper right corner you can find a button to switch camera from Arc Rotation Camera the Free Camera.
#### Keyboard Shortcuts
r = Restart   
p = Pause   
q = open Menu   
m = Sound on / off   
Enter = start game when on start screen 
c = toggle camera arc / free

(when free camera is used:)
w = move forward
a = move left
d = move right
s = move back  

# Tabletop Online

This project is intended to support those who love playing Table Top games, but do not always have the luxury of 
being physically in the same room as their opponents/teammates.

The overall direction is to create a platform where players can create a Room, invite their friends, and then play
their favorite games by bringing in assets and moving them around a virtual game board, all in real-time.

Using Firebase as a real-time NoSQL database, we can create the functionality of the Game Objects, and how they interact
with each-other. Then we just need people to have the ability to add existing or new objects to the game board, and
interact with them, just like you would on a real table.

The beauty of keeping this project agnostic of any actual game, means that contributors do not have to worry about the rules
of the games that will be played. Only the assets and interactions you can have with them need to be implemented, and the
rest is up to the players to utilize how they wish.

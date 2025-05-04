// Entry point for the Robot simulation application.
// This script initializes the terminal interface, handles user input, and manages the flow of the program.
// It interacts with controllers to create and manipulate the Room and Robot models based on user commands.

const Robot = require('./Model/Robot');
const Room = require('./Model/Room');
const readline = require('readline');
const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Controllers
const controllers = {
    RobotController: new (require('./Controller/RobotController'))(),
    RoomController: new (require('./Controller/RoomController'))()
};

// Constants
const states = {
    ROOM: 'ROOM',     
    ROBOT: 'ROBOT',
    COMMANDS: 'COMMANDS' 
};

// Globals
let room;
let robot;
let state;

// Function to initialize the application and start the user interaction loop.
// Clears the console, sets the initial state, and prompts the user for input.
function initialize() {
    console.clear();
    state = states.ROOM;
    printInstruction(state);
    terminal.prompt();
}

// Function to display instructions to the user based on the current state.
// Updates the terminal prompt to guide the user.
function printInstruction(state) {
    switch (state) {
        case states.ROOM:
            terminal.setPrompt('Enter room size (width height): ');
            break;
        case states.ROBOT:
            terminal.setPrompt('Enter robot position and direction (x y N/E/S/W): ');
            break;
        case states.COMMANDS:
            terminal.setPrompt('Enter commands (L, R, F): ');
            break;
    }
}

// Event listener for handling user input from the terminal.
// Processes the input based on the current state and updates the application accordingly.
terminal.on('line', (line) => {
    const input = line.trim();
    console.clear();

    try {
        switch (state) {
            case states.ROOM:
                room = controllers.RoomController.create(input);
                state = states.ROBOT;
                break;
            case states.ROBOT:
                robot = controllers.RobotController.create(input, room);
                state = states.COMMANDS;
                break;
            case states.COMMANDS:
                controllers.RobotController.command(robot, room, input);
                break;
        }
    } catch (error) {
        console.error(error.message);
    }

    if (room && robot)
        controllers.RoomController.draw(room, robot); 

    printInstruction(state); 
    terminal.prompt();
}).on('close', () => {
    console.log('Terminating...'); 
    process.exit(0);
});

// Start the application.
initialize();
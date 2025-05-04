# Robot Simulation Application
Create a room and command a robot within the room.

## Getting Started

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd Robot-Assignment
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

### Running the App

1. Start the program:
   ```bash
   npm run app
   ```

2. Follow the prompts:
   - First, enter the room size (e.g., `5 5` for a 5x5 room).
   - Next, place the robot (e.g., `1 2 N` for position `(1, 2)` facing North).
   - Finally, control the robot with commands like `LFFR` (turn left, move forward twice, turn right).

3. Watch the robot's movements within the room in the terminal.

## Testing

Want to make sure everything works? Run the tests:
```bash
npm test
```

## Project Structure

Here's a quick overview of how the project is organized:

```
robot/
├── src/
│   ├── Controller/       # Handles user input and logic
│   ├── Model/            # Defines the Room and Robot
│   ├── Service/          # Handles operations for Room and Robot
│   └── index.js          # The main entry point
├── tests/                # Unit tests for the app
├── package.json          # Project details and dependencies
└── README.md             # You're reading it!
```

## Notes

- The room size must be between 2x2 and 20x20.
- The robot's starting position must be inside the room.
- Commands can only include `L`, `R`, or `F`.

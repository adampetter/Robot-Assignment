/**
 * RobotService
 * This service provides functionality to create and control a robot within a defined room.
 * It includes methods for movement, rotation, and command execution.
 */

const Robot = require('../Model/Robot');

class RobotService {

    /**
     * Creates a new robot at the specified position and direction.
     * @param {number} x - The x-coordinate of the robot.
     * @param {number} y - The y-coordinate of the robot.
     * @param {string} direction - The initial direction of the robot (N, E, S, W).
     * @returns {Robot} - The created robot instance.
     */
    create(x, y, direction) {
        if (isNaN(x) || isNaN(y))
            throw new Error('Invalid robot xy-position.');
        else if (!['N', 'E', 'S', 'W'].includes(direction))
            throw new Error('Invalid direction. Use N, E, S, or W.');

        return new Robot(x, y, direction);
    }

    /**
     * Rotates the robot 90 degrees to the left.
     * @param {Robot} robot - The robot to rotate.
     */
    turnLeft(robot) {
        if (!robot)
            throw new Error('Argument "robot" is required.');

        const dirs = ['N', 'W', 'S', 'E'];
        const idx = dirs.indexOf(robot.direction);
        robot.direction = dirs[(idx + 1) % 4];
    }

    /**
     * Rotates the robot 90 degrees to the right.
     * @param {Robot} robot - The robot to rotate.
     */
    turnRight(robot) {
        if (!robot)
            throw new Error('Argument "robot" is required.');

        const dirs = ['N', 'E', 'S', 'W'];
        const idx = dirs.indexOf(robot.direction);
        robot.direction = dirs[(idx + 1) % 4];
    }

    /**
     * Moves the robot one step forward in its current direction.
     * Ensures the robot stays within the room boundaries.
     * @param {Robot} robot - The robot to move.
     * @param {Object} room - The room object defining boundaries.
     * @returns {boolean} - True if the move was successful, false otherwise.
     */
    moveForward(robot, room) {
        if (!robot)
            throw new Error('Argument "robot" is required.');
        if (!room)
            throw new Error('Argument "room" is required.');

        let newX = robot.x;
        let newY = robot.y;

        switch (robot.direction) {
            case 'N':
                newY += 1;
                break;
            case 'S':
                newY -= 1;
                break;
            case 'E':
                newX += 1;
                break;
            case 'W':
                newX -= 1;
                break;
        }

        if (this.inside({ x: newX, y: newY }, room)) {
            robot.x = newX;
            robot.y = newY;
            return true;
        } else {
            console.log('Move ignored: Robot would move outside the room boundaries.');
            return false;
        }
    }

    /**
     * Checks if the robot is within the room boundaries.
     * @param {Object} robot - The robot's position.
     * @param {Object} room - The room object defining boundaries.
     * @returns {boolean} - True if the robot is inside the room, false otherwise.
     */
    inside(robot, room) {
        if (!room)
            throw new Error('Argument "room" is required.');
        else if (!robot)
            throw new Error('Argument "robot" is required.');

        return robot.x >= 0 && robot.y >= 0 && robot.x < room.width && robot.y < room.height;
    }

    /**
     * Executes a series of commands to control the robot.
     * Commands include 'L' (turn left), 'R' (turn right), and 'F' (move forward).
     * @param {Robot} robot - The robot to control.
     * @param {Object} room - The room object defining boundaries.
     * @param {string[]} commands - The list of commands to execute.
     * @returns {boolean} - True if all commands were executed successfully.
     */
    execute(robot, room, commands) {
        if (!robot)
            throw new Error('Argument "robot" is required.');
        else if (!room)
            throw new Error('Argument "room" is required.');
        else if (!commands)
            throw new Error('Argument "commands" is required.');

        for (const command of commands) {
            switch (command) {
                case 'L':
                    this.turnLeft(robot);
                    break;
                case 'R':
                    this.turnRight(robot);
                    break;
                case 'F':
                    this.moveForward(robot, room);
                    break;
                default:
                    throw new Error(`Invalid command: "${command}". Use L, R, F.`);
            }
        }

        return true;
    }

    /**
     * Returns the current status of the robot as a string.
     * @param {Robot} robot - The robot to retrieve the status of.
     * @returns {string} - The robot's current position and direction.
     */
    status(robot) {
        return `${robot.x} ${robot.y} ${robot.direction}`;
    }
}

module.exports = RobotService;
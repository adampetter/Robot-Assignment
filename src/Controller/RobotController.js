/**
 * RobotController
 * This controller handles the creation and command execution for the robot.
 */

const RobotService = require('../Service/RobotService');

class RobotController {

    constructor() {
        this.robotService = new RobotService();
    }

    /**
     * Creates a new robot at the specified position and direction.
     * @param {string} input - The input string containing x, y, and direction separated by spaces.
     * @returns {Robot} - The created robot instance.
     */
    create(input) {
        const [x, y, direction] = input.split(' ');
        const posX = parseInt(x, 10);
        const posY = parseInt(y, 10);

        if (isNaN(posX) || isNaN(posY))
            throw new Error('Invalid argument. Please enter a valid x and y integer position.');
        else if (!['N', 'E', 'S', 'W'].includes(direction))
            throw new Error('Invalid direction. Use N, E, S, or W.');

        return this.robotService.create(posX, posY, direction); 
    }

    /**
     * Executes a series of commands to control the robot.
     * @param {Robot} robot - The robot to control.
     * @param {Room} room - The room object defining boundaries.
     * @param {string[]} commands - The list of commands to execute.
     * @returns {boolean} - True if all commands were executed successfully.
     */
    command(robot, room, commands) {
        if (!robot)
            throw new Error('Robot has not been created yet.');

        return this.robotService.execute(robot, room, commands);
    }
}

module.exports = RobotController;
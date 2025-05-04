/**
 * Robot
 * This model represents a robot with a position (x, y) and a direction (N, E, S, W).
 * The robot operates within the boundaries of a room.
 */

class Robot {

    /**
     * Constructs a new Robot instance.
     * @param {number} x - The x-coordinate of the robot (default is 0).
     * @param {number} y - The y-coordinate of the robot (default is 0).
     * @param {string} direction - The initial direction of the robot (default is 'N').
     */
    constructor(x = 0, y = 0, direction = 'N') {
        this.x = x;
        this.y = y;
        this.direction = direction;
    }
}

module.exports = Robot;

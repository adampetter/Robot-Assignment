/**
 * RoomService
 * This service provides functionality to create and visualize a room.
 */

const Room = require('../Model/Room');

class RoomService {

    /**
     * Creates a new room with the specified dimensions.
     * @param {number} width - The width of the room.
     * @param {number} height - The height of the room.
     * @returns {Room} - The created room instance.
     */
    create(width, height) {
        if (isNaN(width) || width <= 0)
            throw new Error('Invalid width. Please enter a positive integer.');
        else if (isNaN(height) || height <= 0)
            throw new Error('Invalid height. Please enter a positive integer.');

        return new Room(width, height);
    }

    /**
     * Draws the room and optionally the robot's position within it.
     * Displays the room in the console.
     * @param {Room} room - The room to draw.
     * @param {Robot} robot - The robot to display in the room (optional).
     */
    draw(room, robot = null) {
        if (!room)
            return;

        for (let y = room.height - 1; y >= 0; y--) {
            let row = '';
            for (let x = 0; x < room.width; x++) {
                if (robot && x === robot.x && y === robot.y) {
                    row += ` ${robot.direction} `; 
                } else {
                    row += ' . ';
                }
            }
            console.log(row);
        }
        console.log('\n');
    }
}

module.exports = RoomService;
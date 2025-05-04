/**
 * RoomController
 * This controller handles the creation and visualization of the room.
 */

const RoomService = require('../Service/RoomService');

class RoomController {

    constructor() {
        this.roomService = new RoomService();
    }

    /**
     * Creates a new room with the specified dimensions.
     * @param {string} input - The input string containing width and height separated by a space.
     * @returns {Room} - The created room instance.
     */
    create(input) {
        const [width, height] = input.split(' ').map(Number);

        if (isNaN(width) || isNaN(height))
            throw new Error('Invalid argument. Please enter a valid width and height integer.');
        else if (width <= 0 || height <= 0)
            throw new Error('Invalid argument. Please enter a positive integer for width and height.');
        else if (width < 2 || height < 2)
            throw new Error('Invalid argument. Please enter a width and height greater than 1.');
        else if (width > 20 || height > 20)
            throw new Error('Invalid argument. Please enter a width and height less than or equal to 20.');

        return this.roomService.create(width, height); 
    }

    /**
     * Draws the room and optionally the robot's position within it.
     * @param {Room} room - The room to draw.
     * @param {Robot} robot - The robot to display in the room (optional).
     */
    draw(room, robot) {
        this.roomService.draw(room, robot);
    }
}

module.exports = RoomController;
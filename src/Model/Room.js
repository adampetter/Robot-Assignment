/**
 * Room
 * This model represents a room with specified dimensions (width and height).
 * The room serves as the boundary within which the robot operates.
 */

class Room {

    /**
     * Constructs a new Room instance.
     * @param {number} width - The width of the room (default is 2).
     * @param {number} height - The height of the room (default is 2).
     */
    constructor(width = 2, height = 2) {
        this.width = width;
        this.height = height;
    }
}

module.exports = Room;

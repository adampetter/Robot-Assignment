/**
 * Unit tests for RoomService.
 * This test suite ensures the RoomService class correctly handles room creation,
 * validates dimensions, and provides functionality for drawing the room with or without a robot.
 */

const RoomService = require('./../../src/Service/RoomService');
const Room = require('./../../src/Model/Room');
const Robot = require('./../../src/Model/Robot');

describe('RoomService', () => {
    let roomService;
    let room;
    let robot;

    beforeEach(() => {
        roomService = new RoomService();
        room = new Room(5, 5);
        robot = new Robot(2, 2, 'N');
    });

    test('should create a room with valid dimensions', () => {
        const newRoom = roomService.create(10, 10);
        expect(newRoom).toBeInstanceOf(Room);
        expect(newRoom.width).toBe(10);
        expect(newRoom.height).toBe(10);
    });

    test('should throw error for invalid room dimensions', () => {
        expect(() => roomService.create(-1, 5)).toThrow('Invalid width. Please enter a positive integer.');
        expect(() => roomService.create(5, -1)).toThrow('Invalid height. Please enter a positive integer.');
    });

    test('should draw room with robot', () => {
        console.log = jest.fn(); 
        roomService.draw(room, robot);
        expect(console.log).toHaveBeenCalled();
    });

    test('should draw room without robot', () => {
        console.log = jest.fn();
        roomService.draw(room);
        expect(console.log).toHaveBeenCalled();
    });
});
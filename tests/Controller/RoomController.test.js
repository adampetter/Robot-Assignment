/**
 * Unit tests for RoomController.
 * This test suite ensures the RoomController class correctly handles room creation,
 * validates input, and interacts with the RoomService for drawing operations.
 */

const RoomController = require('./../../src/Controller/RoomController');
const RoomService = require('./../../src/Service/RoomService');
jest.mock('./../../src/Service/RoomService');

describe('RoomController', () => {
    let roomController;
    let roomServiceMock;

    beforeEach(() => {
        roomServiceMock = new RoomService();
        roomController = new RoomController();
        roomController.roomService = roomServiceMock;
    });

    test('should create a room with valid input', () => {
        roomServiceMock.create.mockReturnValue({ width: 5, height: 5 });
        const room = roomController.create('5 5');
        expect(room).toEqual({ width: 5, height: 5 });
    });

    test('should throw error for invalid input', () => {
        expect(() => roomController.create('5 X')).toThrow('Invalid argument. Please enter a valid width and height integer.');
    });

    test('should draw room', () => {
        roomServiceMock.draw = jest.fn();
        roomController.draw({ width: 5, height: 5 }, { x: 1, y: 1, direction: 'N' });
        expect(roomServiceMock.draw).toHaveBeenCalledWith({ width: 5, height: 5 }, { x: 1, y: 1, direction: 'N' });
    });
});
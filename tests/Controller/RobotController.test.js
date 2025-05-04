/**
 * Unit tests for RobotController.
 * This test suite verifies the functionality of the RobotController class,
 * including creating robots, handling invalid input, and executing commands.
 */

const RobotController = require('./../../src/Controller/RobotController');
const RobotService = require('./../../src/Service/RobotService');
jest.mock('./../../src/Service/RobotService');

describe('RobotController', () => {
    let robotController;
    let robotServiceMock;

    beforeEach(() => {
        robotServiceMock = new RobotService();
        robotController = new RobotController();
        robotController.robotService = robotServiceMock;
    });

    test('should create a robot with valid input', () => {
        robotServiceMock.create.mockReturnValue({ x: 1, y: 1, direction: 'N' });
        const robot = robotController.create('1 1 N');
        expect(robot).toEqual({ x: 1, y: 1, direction: 'N' });
    });

    test('should throw error for invalid input', () => {
        expect(() => robotController.create('1 X N')).toThrow('Invalid argument. Please enter a valid x and y integer position.');
    });

    test('should execute commands', () => {
        robotServiceMock.execute = jest.fn();
        robotController.command({ x: 1, y: 1, direction: 'N' }, { width: 5, height: 5 }, 'LFF');
        expect(robotServiceMock.execute).toHaveBeenCalledWith({ x: 1, y: 1, direction: 'N' }, { width: 5, height: 5 }, 'LFF');
    });
});
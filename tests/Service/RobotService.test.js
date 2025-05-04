/**
 * Unit tests for RobotService.
 * This test suite validates the core functionalities of the RobotService class,
 * including robot creation, movement, turning, and command execution.
 */

const RobotService = require('./../../src/Service/RobotService');
const Robot = require('./../../src/Model/Robot');
const Room = require('./../../src/Model/Room');

describe('RobotService', () => {
    let robotService;
    let robot;
    let room;

    beforeEach(() => {
        robotService = new RobotService();
        robot = new Robot(2, 2, 'N');
        room = new Room(5, 5);
    });

    test('should create a robot with valid inputs', () => {
        const newRobot = robotService.create(1, 1, 'E');
        expect(newRobot).toBeInstanceOf(Robot);
        expect(newRobot.x).toBe(1);
        expect(newRobot.y).toBe(1);
        expect(newRobot.direction).toBe('E');
    });

    test('should throw error for invalid direction', () => {
        expect(() => robotService.create(1, 1, 'X')).toThrow('Invalid direction. Use N, E, S, or W.');
    });

    test('should turn robot left', () => {
        robotService.turnLeft(robot);
        expect(robot.direction).toBe('W');
    });

    test('should turn robot right', () => {
        robotService.turnRight(robot);
        expect(robot.direction).toBe('E');
    });

    test('should move robot forward within room boundaries', () => {
        robotService.moveForward(robot, room);
        expect(robot.y).toBe(3);
    });

    test('should not move robot outside room boundaries', () => {
        robot.y = 4;
        robotService.moveForward(robot, room);
        expect(robot.y).toBe(4);
    });

    test('should execute valid commands', () => {
        robotService.execute(robot, room, 'LFFR');
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(2);
        expect(robot.direction).toBe('N');
    });

    test('should throw error for invalid commands', () => {
        expect(() => robotService.execute(robot, room, 'X')).toThrow('Invalid command: "X". Use L, R, F.');
    });
});
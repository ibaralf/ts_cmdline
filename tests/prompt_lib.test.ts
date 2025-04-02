import { getUserInput, getInteger } from '../src/lib/prompt_lib'; // Replace './your-module' with the actual path
import * as readline from 'readline';

// Helper function to mock readline
function mockReadline(answer: string) {
    const mockQuestion = jest.fn();
    const mockClose = jest.fn();
    const mockCreateInterface = jest.spyOn(readline, 'createInterface');

    mockCreateInterface.mockReturnValue({
        question: mockQuestion,
        close: mockClose,
    } as any);

    mockQuestion.mockImplementation((_query, callback: (answer: string) => void) => {
        callback(answer);
    });

    return { mockQuestion, mockClose };
}

describe('getUserInput', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should resolve with the user input', async () => {
        const { mockQuestion, mockClose } = mockReadline('John Doe');
        const query = 'Enter your name: ';
        const result = await getUserInput(query);

        expect(result).toBe('John Doe');
        expect(mockQuestion).toHaveBeenCalledWith(query, expect.any(Function));
        expect(mockClose).toHaveBeenCalled();
    });

    it('should handle empty string input', async () => {
        const { mockQuestion, mockClose } = mockReadline('');
        const query = 'Enter input: ';
        const result = await getUserInput(query);

        expect(result).toBe('');
        expect(mockQuestion).toHaveBeenCalledWith(query, expect.any(Function));
        expect(mockClose).toHaveBeenCalled();
    });
});

describe('getInteger', () => {
    let consoleLogSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock console.log
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should resolve with the integer input', async () => {
        mockReadline('123');
        const result = await getInteger('Enter an integer: ');
        expect(result).toBe(123);
    });

    it('should handle invalid input and retry', async () => {
        const { mockQuestion } = mockReadline('abc');
        mockQuestion.mockImplementationOnce((_query, callback: (answer: string) => void) => {
            callback('abc');
        });
        mockQuestion.mockImplementationOnce((_query, callback: (answer: string) => void) => {
            callback('456');
        });

        const result = await getInteger();

        expect(result).toBe(456);
        expect(consoleLogSpy).toHaveBeenCalledWith('ERROR: Please enter an integer value.');
    });

    it('should use provided prompt', async () => {
        // Add an extra whitespace after the prompt
        const { mockQuestion } = mockReadline('101');
        const prompt = 'Enter a number: ';
        await getInteger(prompt);
        expect(mockQuestion).toHaveBeenCalledWith(prompt, expect.any(Function));
    });
});
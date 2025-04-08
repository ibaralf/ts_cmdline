import { getInteger, promptYesNo } from '../src/lib/prompt_lib'; // Replace './your-module' with the actual path
import * as readline from 'readline';

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

describe('promptYesNo', () => {
    let consoleLogSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock console.log
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
  
    it('should resolve with "yes" when the user enters "yes"', async () => {
        mockReadline('yes');
        const result = await promptYesNo('Do you agree?');
        expect(result).toBe('yes');
    });

    it('should resolve with "n" when the user enters "n"', async () => {
        mockReadline('n');
        const result = await promptYesNo('Confirm?');
        expect(result).toBe('n');
    });
  
    it('should handle uppercase input and resolve with lowercase', async () => {
        mockReadline('YES');
        const result = await promptYesNo('Ready');
        expect(result).toBe('yes');
    });
  
    it('should handle leading/trailing whitespace and resolve with trimmed lowercase', async () => {
        mockReadline('  Yes  ');
        const result = await promptYesNo('Start');
        expect(result).toBe('yes');
    });
  
  });

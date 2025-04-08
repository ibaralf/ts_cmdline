import { getUserInput } from '../src/utils/user_input_utils'; 
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
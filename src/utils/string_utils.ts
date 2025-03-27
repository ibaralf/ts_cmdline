export function formPrompt(userString?: string): string {
    var promptText: string = ""
    if (userString) {
        promptText = userString.trimEnd() + " ";
    }
    return promptText;
}
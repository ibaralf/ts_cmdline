export function formPrompt(userString?: string): string {
    var promptText: string = ""
    if (userString) {
        promptText = userString.trimEnd() + " ";
    }
    return promptText;
}

export function formPromptWithDefault(userString?: string, defVal?: any): string {
    var promptText: string = ""
    if (userString) {
        promptText = userString.trimEnd()
        const lastChar = promptText[promptText.length - 1];
        if (defVal) {
            if (lastChar == ":") {
                promptText = promptText.slice(0, -1);
                
            }
            promptText = promptText + "(" + String(defVal) + "):";
        }
        promptText = promptText + " ";
    }
    return promptText;
}
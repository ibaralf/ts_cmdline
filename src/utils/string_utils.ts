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

export function formYesNoPrompt(userString?: string, defVal?: any): string {
    var promptText: string = ""
    if (userString) {
        promptText = userString.trimEnd()
        const lastChar = promptText[promptText.length - 1];
        if (lastChar == ":") {
            promptText = promptText.slice(0, -1);
        }
        if (defVal) {    
            promptText = promptText + " Yes/No " + "(" + defVal + "):";
        } else {
            promptText = promptText + " (Yes/No): ";
        }
    }
    return promptText;
}

export function formBooleanPrompt(userString?: string, defVal?: any): string {
    var promptText: string = ""
    if (userString) {
        promptText = userString.trimEnd()
        const lastChar = promptText[promptText.length - 1];
        if (lastChar == ":") {
            promptText = promptText.slice(0, -1);
        }
        if (defVal) {    
            promptText = promptText + " T/F " + "(" + defVal + "):";
        } else {
            promptText = promptText + " (T/F): ";
        }
    }
    return promptText;
}

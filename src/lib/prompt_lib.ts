import {formPrompt, formPromptWithDefault } from "../utils/string_utils";
import { getUserInput } from "../utils/user_input_utils";

function errorPromise(): Promise<string> {
    return new Promise((resolve) => {
        resolve('ERROR')
    });
}

export async function getInteger(userPrompt? :string, defaultVal?: number): Promise<number> {
    const intPattern: RegExp = /^[0-9]+$/i;
    var promptText = formPromptWithDefault(userPrompt, defaultVal);
    var myVal: number = null;
    var notDone = true;
    while(notDone) {
        let myInteger: number = null;
        const intval = await getUserInput(promptText);
        if (intval == "" && defaultVal) {
            notDone = false;
            myVal = defaultVal;
        } else if (intPattern.test(intval)) {
            notDone = false;
            myVal = parseInt(intval);
        } else {
            console.log('ERROR: Please enter an integer value.')
        }
    }

    return new Promise((resolve) => {
        resolve(myVal)
    });
}

export async function promptYesNo(userPrompt? :string): Promise<string> {
    let promptText = formPrompt(userPrompt) + "(Y/N)? "
    var myVal: string = null;
    var notDone = true;
    while(notDone) {
        const ynArray: string[] = ["yes", "no", "y", "n"];
        let myString: string = null;
        const strVal = await getUserInput(promptText);
        myString = strVal.trim().toLowerCase();
        if (ynArray.includes(myString)) {
            notDone = false;
            myVal = myString;
        } else {
            console.log('ERROR: Please enter Yes or No only.')
        }
    }

    return new Promise((resolve) => {
        resolve(myVal)
    });
}

export async function getDate(userPrompt?: string): Promise<string> {
    const datePattern: RegExp = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/i;
    var promptText = formPrompt(userPrompt);
    var myVal: string = null;
    var notDone = true;
    while(notDone) {
        let myDate: string = null;
        const dateVal = await getUserInput(promptText);
        if (datePattern.test(dateVal)) {
            notDone = false;
            myVal = dateVal;
        } else {
            console.log('ERROR: Please enter a valid date (MM/DD/YYYY).')
        }
    }

    return new Promise((resolve) => {
        resolve(myVal)
    });
}

export async function selectChoice(choices: string[], choiceOpt?: string[], userPrompt? :string): Promise<string> {

    var userChoices: string[] = [];
    if (choiceOpt) {
        if (choices.length != choiceOpt.length) {
            return errorPromise();
        }
        userChoices = choiceOpt
    } else {
        choices.forEach((choice, index) => {
            userChoices.push(String(index + 1));
        });
    }
    var promptText = formPrompt(userPrompt);
    choices.forEach((choice, index) => {
        console.log(userChoices[index] + ") " + choice);
    });
    var myVal: string = null;
    var notDone = true;
    while(notDone) {
        let myChoice: string = null;
        const choiceVal = await getUserInput(promptText);
        if (userChoices.includes(choiceVal)) {
            notDone = false;
            myVal = choiceVal;
        } else {
            console.log('ERROR: Select one [' + userChoices + "]");
        }
    }

    return new Promise((resolve) => {
        resolve(myVal)
    });
}
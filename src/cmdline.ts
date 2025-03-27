import * as readline from 'readline';
import * as fs from 'fs';
import readConfigFile from './config_lib';
import {Config} from './config_lib';
import {formPrompt} from "./utils/string_utils";

// TODO:
// * add tests under ./tests
// * add default values
// * add date entry
// * add multiple choice
// * add range options
let cfg = <Config>{};

async function getUserInput(query: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(query, (answer: string) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function getInteger(userPrompt? :string): Promise<number> {
    const intPattern: RegExp = /^[0-9]+$/i;
    var promptText = formPrompt(userPrompt);
    var myVal: number = null;
    var notDone = true;
    while(notDone) {
        let myInteger: number = null;
        const intval = await getUserInput(promptText);
        if (intPattern.test(intval)) {
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

async function promptYesNo(userPrompt? :string): Promise<string> {
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

function errorPromise(): Promise<string> {
    return new Promise((resolve) => {
        resolve('ERROR')
    });
}

async function getDate(userPrompt?: string): Promise<string> {
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

async function selectChoice(choices: string[], choiceOpt?: string[], userPrompt? :string): Promise<string> {

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

async function showLogo(): Promise<void> {
    let lpath = process.cwd() + "/" + cfg.logo_path;
    const logoText = await fs.promises.readFile(lpath, 'utf8');
    console.log(logoText);
    return new Promise(resolve => resolve(null));
}

async function main() {
    cfg = await readConfigFile()
    
    const nval = await Promise.all([showLogo()])

    const currdate = await getDate("What is the current date?");
    console.log(`CURRDATE IS: ${currdate}`);

    const picks: string[] = ["Apple", "Banana", "Carrot", "All"];
    const pickOpt: string[] = ["a", "b", "c", "d"];
    const pile = await selectChoice(picks, pickOpt, "What is your favorite?");
    console.log(`YOU SELECTED: ${pile}`)

    //console.log('FIRST');
    const name = await getUserInput('Please enter your name: ');
    console.log(`Hello, ${name}!`);

    const vale = await getInteger('Integer test: ');
    console.log(`You are ${vale} years old.`);

    const yn = await promptYesNo('Yes/No test: ');
    console.log(`BOOL ${yn} .`);
}

main();


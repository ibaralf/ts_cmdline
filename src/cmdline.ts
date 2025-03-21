import * as readline from 'readline';
import * as fs from 'fs';
import readConfigFile from './config_lib';
import {Config} from './config_lib';

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

// TODO: add range options
async function getInteger(userPrompt? :string): Promise<number> {
    const intPattern: RegExp = /^[0-9]+$/i;
    var promptText = ""
    if (userPrompt) {
        promptText = userPrompt;
    }
    var myVal: number = null;
    var notDone = true;
    while(notDone) {
        let myInteger: number = null;
        const intval = await getUserInput(promptText);
        console.log(`YOU Entered: ${intval}`)
        //myInteger = parseInt(intval);
        //if (!isNaN(myInteger) && Number.isInteger(myInteger)) {
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
    let promptText = "(Y/N)? "
    if (userPrompt) {
        promptText = userPrompt + " " + promptText;
    }
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

async function showLogo(): Promise<void> {
    let lpath = process.cwd() + "/" + cfg.logo_path;
    const logoText = await fs.promises.readFile(lpath, 'utf8');
    console.log(logoText);
    return new Promise(resolve => resolve(null));
}

async function main() {
    cfg = await readConfigFile()
    
    const nval = await Promise.all([showLogo()])

    //console.log('FIRST');
    const name = await getUserInput('Please enter your name: ');
    console.log(`Hello, ${name}!`);

    const vale = await getInteger('Integer test: ');
    console.log(`You are ${vale} years old.`);

    const yn = await promptYesNo('Yes/No test: ');
    console.log(`BOOL ${yn} .`);
}

main();


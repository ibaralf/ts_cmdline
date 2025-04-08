import * as readline from 'readline';
import * as fs from 'fs';
import readConfigFile from './config_lib';
import {Config} from './config_lib';
import {getUserInput} from "./utils/user_input_utils";
import {getDate, getInteger, selectChoice, promptYesNo} from "./lib/prompt_lib";

// TODO:
// * add default values
// * add date entry
// * add multiple choice
// * add range options
let cfg = <Config>{};

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


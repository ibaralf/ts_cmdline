
export async function getInput(prompt?: string): Promise<string> {

    if (prompt) {
        console.log(prompt);
    }
    const readLine = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let answer = ""
    readLine.question("", (it: string) => { 
         answer = it
         readLine.close()
    })
    return(answer)

}

// ——— Call

export async function callMyFunc() {

    let answer = await getInput()
    console.log(answer)

}
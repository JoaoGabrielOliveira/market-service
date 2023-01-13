export default async function SendEvent(message : string, data : any, level : string = 'info') : Promise<void>{
    switch(level){
        case 'info':
            console.log(`${ConsoleColor.FtBlue}[${level}] ${ConsoleColor.FtDefault + message}`, data);
        break;

        case 'warn':
            console.warn(`${ConsoleColor.FtYellow}[${level}] ${ConsoleColor.FtDefault + message}`, data);
        break;

        case 'error':
            console.error(`${ConsoleColor.FtRed}[${level}] ${ConsoleColor.FtDefault + message}`, data);
        break;

        default:
            throw new Error("Send type level is not accept!");
    }
}

enum ConsoleColor {
    FtBlue = "\x1b[34m",
    FtRed = "\x1b[31m",
    FtYellow = "\x1b[33m",
    FtDefault = "\x1b[37m"
}
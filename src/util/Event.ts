export default async function SendEvent(message : string, data : any, level : string = 'info') : Promise<void>{
    switch(level){
        case 'info':
            console.log(`[${level}] ${message}`, data);
        break;

        case 'warn':
            console.warn(`[${level}] ${message}`, data);
        break;

        case 'error':
            console.error(`[${level}] ${message}`, data);
        break;

        default:
            throw new Error("Send type level is not accept!");
    }
}
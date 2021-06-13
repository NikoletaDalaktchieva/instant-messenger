export class Message {
    text: string;
    sender: String;
    dispatchDate?: Date;

    constructor(text: string, sender: String, dispatchDate: Date) {
        this.text = text;
        this.sender = sender;
        this.dispatchDate = dispatchDate;
    }
}
import { User } from 'src/user';
import { Chat } from './chatModel';

export class Message {
    text: string;
    chat: Chat;
    sender: User;
    dispatchDate: Date;

    constructor(text: string, chat: Chat, sender: User, dispatchDate: Date) {
        this.text = text;
        this.chat = chat;
        this.sender = sender;
        this.dispatchDate = dispatchDate;
    }

}
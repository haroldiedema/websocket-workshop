import {ChatWindow}   from './chat-window';
import {EventEmitter} from './events';
import {MouseTracker} from './mouse-tracker';
import {UserList}     from './user-list';

/**
 * The workshop client is responsible for communication between your browser
 * and the server. Follow the assignments in the README file to make everything
 * functional.
 */
export class WorkshopClient extends EventEmitter
{
    private socket: WebSocket;

    private readonly users: UserList            = new UserList();
    private readonly chat: ChatWindow           = new ChatWindow();
    private readonly mouseTracker: MouseTracker = new MouseTracker();

    constructor(private readonly nickname: string)
    {
        super();

        // ----------------------------------------------------------------- //

        // TODO: Assignment 1 - Connecting to the server

        // ----------------------------------------------------------------- //

        if (this.socket) {
            this.socket.onclose   = this.onDisconnect.bind(this);
            this.socket.onopen    = this.onConnect.bind(this);
            this.socket.onmessage = this.onData.bind(this);
            this.socket.onerror   = (e: Event) => console.error(e);
        }
    }

    /**
     * Invoked when the client is disconnected from the server.
     *
     * Use the {.wasClean} property of the event to determine whether we were
     * disconnected cleanly or due to an error. If wasClean is false, consult
     * the {.code} and {.reason} property to figure out what went wrong.
     *
     * @param {CloseEvent} event
     * @private
     */
    private onDisconnect(event: CloseEvent): void
    {
        this.emit('disconnected', event.reason);

        // TODO: Assignment 2 - Handling disconnects & showing error messages
    }

    /**
     * Invoked when the client established a socket connection to the server.
     *
     * This method is responsible for sending the initial handshake payload.
     * Failing to send a correct payload will result in an immediate
     * disconnect from the server.
     *
     * Use the {send()} method on the socket to send arbitrary data to the
     * server. Consult the README for information about the payload that must
     * be sent to the server.
     *
     * @private
     */
    private onConnect(): void
    {
        this.emit('connected');

        // TODO: Assignment 3 - Sending the handshake payload
    }

    /**
     * Invoked when a message was received from the server.
     *
     * Decode the message into a JSON object using JSON.parse(message.data)
     * before performing any operations.
     *
     * @param {MessageEvent} message
     * @private
     */
    private onData(message: MessageEvent): void
    {
        // Use the dev tools of your browser to inspect the message payload.
        console.log(message.data);

        // TODO: Assignment 5 - Listening for incoming chat messages
        // TODO: Assignment 6 - Listening for joining and leaving users
        // TODO: Assignment 8 - Listening for mouse coordinates of other users.
    }

    /**
     * Sends a chat message.
     *
     * @param {string} message
     */
    public sendChatMessage(message: string): void
    {
        // TODO: Assignment 4 - Sending chat messages to the server
        console.warn('Implement me in assignment 4!');
    }

    /**
     * Invoked every couple of milliseconds with the current mouse cursor
     * position on the screen. Sending your cursor position allows other users
     * to see where your mouse is on the screen.
     *
     * Consult the README for payload information.
     *
     * @param {number} x
     * @param {number} y
     */
    public sendMouseCoordinates(x: number, y: number): void
    {
        // TODO: Assignment 7 - Send your mouse coordinates to the server.
    }
}

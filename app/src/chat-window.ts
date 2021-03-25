export class ChatWindow
{
    private readonly el: HTMLDivElement;

    constructor()
    {
        this.el = document.querySelector('#chatContent');
    }

    /**
     * Writes a message coming from the given nickname to the chat window.
     *
     * @param {string} nickname
     * @param {string} message
     */
    write(nickname: string, message: string): void
    {
        const el = document.createElement('div');
        el.innerHTML = '<b>' + nickname + '</b>: ' + message;

        this.el.appendChild(el);
        el.scrollIntoView({behavior: 'smooth'});
    }
}

type MouseTrackerObject = { x: number, y: number, e: HTMLDivElement };

export class MouseTracker
{
    private users: Map<string, MouseTrackerObject> = new Map();

    /**
     * Adds a mouse tracker with the given nickname.
     *
     * @param {string} nickname
     */
    public add(nickname: string): void
    {
        if (this.users.has(nickname)) {
            return;
        }

        const el     = document.createElement('div');
        el.innerText = nickname;
        el.classList.add('mouse-tracker');

        document.body.appendChild(el);

        this.users.set(nickname, {x: 0, y: 0, e: el});
    }

    /**
     * Removes the mouse tracker by the given nickname.
     *
     * @param {string} nickname
     */
    public remove(nickname: string): void
    {
        if (!this.users.has(nickname)) {
            return;
        }

        this.users.get(nickname).e.remove();
        this.users.delete(nickname);
    }

    /**
     * Returns true if a mouse tracker with the given nickname exists.
     *
     * @param {string} nickname
     * @returns {boolean}
     */
    public has(nickname: string): boolean
    {
        return this.users.has(nickname);
    }

    /**
     * Updates the screen coordinates of the mouse tracker with the given nickname.
     *
     * @param {string} nickname
     * @param {number} x
     * @param {number} y
     */
    public update(nickname: string, x: number, y: number): void
    {
        if (!this.users.has(nickname)) {
            console.error(`MouseTracker with nickname "${nickname}" does not exist. Did you forget to add() it?`);
            return;
        }

        const o: MouseTrackerObject = this.users.get(nickname);

        o.x            = x;
        o.y            = y;
        o.e.style.top  = y + 'px';
        o.e.style.left = x + 'px';
    }
}

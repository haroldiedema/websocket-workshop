export class UserList
{
    private users: Map<string, HTMLLIElement> = new Map();
    private list: HTMLUListElement;
    private count: HTMLSpanElement;

    constructor()
    {
        this.list  = document.querySelector('#userList');
        this.count = document.querySelector('#userCount');
    }

    /**
     * Adds a user to the user list.
     *
     * @param {string} nickname
     */
    public add(nickname: string): void
    {
        if (this.users.has(nickname)) {
            return;
        }

        const el     = document.createElement('li') as HTMLLIElement;
        el.innerText = nickname;

        this.list.appendChild(el);
        this.users.set(nickname, el);

        this.count.innerText = this.users.size.toString();
    }

    /**
     * Removes a user from the user list.
     *
     * @param {string} nickname
     */
    public remove(nickname: string): void
    {
        if (!this.users.has(nickname)) {
            return;
        }

        this.users.get(nickname).remove();
        this.users.delete(nickname);

        this.count.innerText = this.users.size.toString();
    }
}

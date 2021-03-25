DevTalks - WebSockets Workshop
==============================

# Set-up

Make sure you have Node JS installed. Verify by running `node -v` from your
terminal. Version 10.x or higher should be supported.

Clone the repository:

`git clone https://github.com/haroldiedema/websocket-workshop.git`

Install dependencies:

`# npm i`

Run the server:

`# npm run server`

You should now see a message that looks something like this:

```
Workshop server running at http://localhost:10101/
Modified sources in the "app/" directory are recompiled automatically.
```

> If port 10101 is already in use on your machine, open `src/Workshop.ts` and
modify the port number by adjusting the `port` constant. Run `npm run build` to
recompile the sources.


The files you'll be working with can be found in the `/app/src` directory. The
Typescript files are recompiled during requests, so you don't need to worry
about restarting the server. Typescript files are also not checked for type
validity during compilation, so if you just want to write plain javascript, go
right ahead!

# Assignments

Perform the following assignments in order.

## 1 - Connecting to the server

> File: `/app/src/workshop-client.ts`
> Method: `constructor`

Create a WebSocket instance that connects to `ws://lekker.sexy:9750` (yes, that
domain name is not a joke) and store it in the property `this.socket`. Use the
protocol `devtalks-1.0` when establishing a connection.

Consult the documentation for information or examples on how to establish a
WebSocket connection while also providing a custom protocol.

*Useful resources:*
 - https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
 - https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#examples

## 2 - Handling disconnects & showing error messages

> File: `/app/src/workshop-client.ts`
> Method: `onDisconnect`

The server may decide to disconnect us for whatever reason. In order to figure
out while we're being kicked from the server, we'll need to intercept the
disconnect (close) event and read data from the `.wasClean`, `.code` and
`.reason` properties of the `CloseEvent`.

Implement the `onDisconnect` method in such a way that error messages can be
inspected. It doesn't matter if you use something like `console.log` or `alert`,
as long as you know what is going on.

## 3 - Sending the handshake payload

> File: `/app/src/workshop-client.ts`
> Method: `onConnect`

The server only accepts `string` data that consists of a valid JSON object. Use
the javascript function `JSON.stringify()` to convert your object to a string
that can be sent to the server directly.

Since the server needs to know who you are, you need to send your nickname to
the server. The payload should look like this:

```json
{ "nick": "Your Nickname" }
```

The nickname is passed to the constructor of the `WorkshopClient` class, and is
already stored in the `nickname` property of the class, so you should have no
issues accessing it.

*Useful resources:*
 - https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
 - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

## 4 - Sending chat messages to the server

> File: `/app/src/workshop-client.ts`
> Method: `sendChatMessage`

Use the `send` method on the socket instance to send data to the server in the
same way as you already implemented in the second assignment. The
`WorkshopClient` class has a `sendChatMessage` method that is invoked every time
the user hits the return-key or hits the 'send' button in the chat window.

The payload should look like this:

```json
{
    "type": "chat",
    "message": "Your message here"
}
```
 
*NOTE*: Make sure the message is not empty. Sending empty messages will result in a
 disconnect.

## 5 - Listening to incoming chat messages

> File: `/app/src/workshop-client.ts`
> Method: `onData`

All data received from the server are valid JSON strings and should be decoded
using `JSON.parse`. Every received payload contains a `type` property which
denotes the type of payload.

The format of an event payload looks like this:
```json
{
    "type": "message type here",
    "data": {
        "custom": "properties",
        "for": "the",
        "payload": "here"
    }
}
```

For this assignment, we're going to check for the `chat` message type. A payload
with the type `chat` is always accompanied by a `nickname` and `message`
property in the `data` object.

*Useful resources*:
 - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse

## 6 - Listening for joining and leaving users

> File: `/app/src/workshop-client.ts`
> Method: `onData`

In order to populate the online users list, we'll need to listen to users
joining and leaving the server. The message type for this is `join` and `leave`
accompanied by a `nickname` property in the `data` property.

Our application already has a `UserList` object which automatically populates
the user list element on the webpage. You can find this instance in the `users`
property of the `WorkshopClient` class.

Use `this.users.add()` to add new users to the list when they join and use
`this.users.remove()` to remove users from the list when they leave.

Note that this event is fired for every user that is already connected to the
server once your client joins.

## 7 - BONUS #1 - Sending mouse coordinates to the server

> File: `/app/src/workshop-client.ts`
> Method: `sendMouseCoordinates`

Now that we have a fully functional chat application, how about a little extra.
Let's send our mouse coordinates to the server so other users (that finished the
next assignment) can see our mouse cursor in real-time!

Send the following payload to the server, using the `x` and `y` coordinates that
are given to the `sendMouseCoordinates` method. Don't worry about invoking this
method, since this is already done automatically. By mindful to only send the
payload when you're really connected to the server.

```json
{
    "type": "mouse",
    "vector": {
        "x": x,
        "y": y
    }
}
```

Note that sending bad arguments or invalid data structure will result in an
immediate disconnect from the server.

## 8 - BONUS #2 - Listening to mouse coordinate events from other users.

> File: `/app/src/workshop-client.ts`
> Method: `onData`

You can use the `MouseTracker` object, located `this.mouseTracker` to visualize
the current mouse position of other users that are also connected to the server,
provided they finished the previous assignment.

The payload received by the `onData` method looks like this:

```json
{
    "type": "mouse",
    "data": {
        "nickname": "Nickname here",
        "x": number,
        "y": number
    }
}
```

Use the `mouseTracker` to `add()` the user. Use the `has(nickname)` method to
verify if the user was already added to the mouse tracker. After adding the
user, use the `update(nickname, x, y)` method to update the coordinates of the
mouse tracker visualisation of this user.

Don't forget to `remove()` the user from the mouse tracker when the user leaves
the server!

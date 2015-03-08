# antennas

- Front-end:
    - React.js
    - jQuery
- Back-end:
    - Node.js
    - MongoDB

## debug

### MongoDB

Install MongoDB and start it as daemon.

```bash
$ brew install mongo
$ mongod
```

### Prepare

Clone this repository.

```bash
$ hub clone 1000ch/antennas
```

Install node modules.

```bash
$ npm install
```

To build scripts,

```bash
$ npm run build
```

### Insert data to MongoDB

```bash
$ node dist/fetch.js
```

### Start web app

```bash
$ npm start
```

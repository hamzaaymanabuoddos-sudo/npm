class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }

        this.events[event].push(listener);
    }

    off(event, listener) {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(
            fn => fn !== listener
        );
    }

    emit(event, ...args) {
        if (!this.events[event]) return;

        this.events[event].forEach(
            listener => listener(...args)
        );
    }

    once(event, listener) {
        const onceListener = (...args) => {
            listener(...args);
            this.off(event, onceListener);
        };

        this.on(event, onceListener);
    }
}
const emitter = new EventEmitter();

function responseHandler(data) {
    console.log('Received data:', data);
}

emitter.on('data', responseHandler);

emitter.emit('data', 'Hello, World!');

emitter.off('data', responseHandler);

emitter.emit('data', 'Hello again!');

emitter.once('data', responseHandler);

emitter.emit('data', 'First call!'); // 1

emitter.emit('data', 'Second call!'); // 2
class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
  }

  emit(event) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback());
    }
  }
}

export default new EventEmitter();

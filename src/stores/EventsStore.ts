export interface IEvent {
  type: string;
  payload?: any;
}

class EventsStore {
  listeners: { [type: string]: ((event: IEvent) => void)[] } = {};

  send(event: IEvent) {
    if (this.listeners[event.type]) {
      for (let i = 0; i < this.listeners[event.type].length; i++) {
        try {
          this.listeners[event.type][i](event);
        } catch (error) {
          console.error("EventsStore", "send", error);
        }
      }
    }
  }

  on(type: string, callback: (event: IEvent) => void) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(callback);
    return () => this.unregister(type, callback);
  }

  unregister(type: string, callback: (event: IEvent) => void) {
    this.listeners[type].splice(this.listeners[type]?.indexOf(callback), 1);
  }
}

const eventsStore = new EventsStore();
export default eventsStore;

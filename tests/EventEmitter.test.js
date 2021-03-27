import emitter from '../src/EventEmitter';

describe('EventEmitter block test', () => {
  beforeEach(() => {
    emitter.events = {};
  });

  describe('subscribe function', () => {
    it('should be 1 event after subscribing', () => {
      emitter.subscribe(
        'test',
        jest.fn(() => {})
      );

      expect(emitter.events.test).toHaveLength(1);
    });

    it('should be 5 events after subscribing', () => {
      for (let i = 0; i < 5; i += 1) {
        emitter.subscribe(
          'test',
          jest.fn(() => {})
        );
      }

      expect(emitter.events.test).toHaveLength(5);
    });

    it("should be 4 'test' events and 3 'test2' events after subscribing", () => {
      for (let i = 0; i < 4; i += 1) {
        emitter.subscribe(
          'test',
          jest.fn(() => {})
        );
      }

      for (let i = 0; i < 3; i += 1) {
        emitter.subscribe(
          'test2',
          jest.fn(() => {})
        );
      }

      expect(emitter.events.test).toHaveLength(4);
      expect(emitter.events.test2).toHaveLength(3);
    });
  });

  describe('emit block', () => {
    let callback;

    beforeEach(() => {
      callback = jest.fn(() => {});
    });

    it('should be called callback', () => {
      emitter.subscribe('test', callback);

      emitter.emit('test');

      expect(callback).toBeCalled();
    });

    it('should be called callback 5 times', () => {
      for (let i = 0; i < 5; i += 1) {
        emitter.subscribe('test', callback);
      }

      emitter.emit('test');

      expect(callback).toBeCalledTimes(5);
    });

    it("shouldn't be called callback", () => {
      emitter.subscribe('test', callback);

      emitter.emit('no_test');

      expect(callback).not.toBeCalled();
    });
  });
});

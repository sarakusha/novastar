export default class ConnectionClosedError extends Error {
  constructor() {
    super('Connection closed');
  }
}

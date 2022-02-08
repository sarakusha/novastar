import { Packet } from './Packet';

export default class TimeoutError extends Error {
  constructor(readonly req: Packet, readonly tag?: string) {
    super(`No response was received for the #${req.serno}${tag ? ` [${tag}]` : ''} request.`);
  }
}

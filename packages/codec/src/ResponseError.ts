import { ErrorType, Packet } from './Packet';

/**
 * Response error
 */
export default class ResponseError extends Error {
  /**
   * Constructor
   * @param res - response
   * @param tag - description
   */
  constructor(readonly res: Readonly<Packet>, readonly tag?: string) {
    super(`Request #${res.serno}${tag ? ` [${tag}:${res.source}.${res.port}.${res.rcvIndex}]` : ''} failed with <${ErrorType[res.ack]}>`);
  }
}

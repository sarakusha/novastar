import { API, Session } from '@novastar/codec';

import './api';
import { Id } from './common';

export type SessionAPI = Id<API & Session>;

export type { API };

export default Session;

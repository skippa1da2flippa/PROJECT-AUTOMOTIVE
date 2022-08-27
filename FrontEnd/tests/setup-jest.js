import 'jest-preset-angular/setup-jest';
import 'core-js';
import axios from 'axios';
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;



jest.setTimeout(31000);

// https://stackoverflow.com/questions/42677387/jest-returns-network-error-when-doing-an-authenticated-request-with-axios
axios.defaults.adapter = require('axios/lib/adapters/http');

import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "node:util";
const { ReadableStream, TransformStream } = require("node:stream/web");
const { performance } = require("node:perf_hooks");

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  ReadableStream: { value: ReadableStream },
  TransformStream: { value: TransformStream },
  performance: { value: performance },
});

const { Blob, File } = require("node:buffer");
const { fetch, Headers, FormData, Request, Response } = require("undici");

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
  clearImmediate: { value: clearImmediate },
});

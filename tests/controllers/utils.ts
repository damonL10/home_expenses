import type { Request, Response } from "express";

export function getMockRequest(): Request {
  return {
    params: {},
    query: {},
    body: {},
    session: { user: {}},
  } as Request;
};

export function getMockResponse(): Response {
  let res: Response;  
  res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as any;
  return res;
};

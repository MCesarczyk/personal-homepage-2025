import "@testing-library/jest-dom";
import { beforeEach, vi } from "vitest";
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "../services/msw/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const localStorageMock = {
  getItem: vi.fn((key: string) => {
    if (key === "PH24_refresh_token") {
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM4NWRmMWExLWI2MGYtNDgyYi1iYzNmLTQ2NTg2MGJkZTM5ZSIsInRva2VuSWQiOiI2MWMxMDMyZC1jZTU3LTQ3MmItYjRlZS1hOTU4YTdmZmYyYjMiLCJpYXQiOjE3NTk2OTQwMzEsImV4cCI6MTc2MDI5ODgzMX0.GcV9vfjvzHLl1FN1yAk5lmflGY30zacL9vofemenWs8";
    }
    if (key === "PH24_access_token") {
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM4NWRmMWExLWI2MGYtNDgyYi1iYzNmLTQ2NTg2MGJkZTM5ZSIsImlhdCI6MTc1OTcwMzk3NiwiZXhwIjoxNzU5NzA0ODc2fQ.dJPun9xj-TuylcG3YG3syoleLtxlOowTIiR6kqWix08";
    }
    return null;
  }),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

beforeEach(() => {
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();

  localStorageMock.getItem.mockImplementation((key: string) => {
    if (key === "PH24_refresh_token") {
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM4NWRmMWExLWI2MGYtNDgyYi1iYzNmLTQ2NTg2MGJkZTM5ZSIsInRva2VuSWQiOiI2MWMxMDMyZC1jZTU3LTQ3MmItYjRlZS1hOTU4YTdmZmYyYjMiLCJpYXQiOjE3NTk2OTQwMzEsImV4cCI6MTc2MDI5ODgzMX0.GcV9vfjvzHLl1FN1yAk5lmflGY30zacL9vofemenWs8";
    }
    if (key === "PH24_access_token") {
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM4NWRmMWExLWI2MGYtNDgyYi1iYzNmLTQ2NTg2MGJkZTM5ZSIsImlhdCI6MTc1OTcwMzk3NiwiZXhwIjoxNzU5NzA0ODc2fQ.dJPun9xj-TuylcG3YG3syoleLtxlOowTIiR6kqWix08";
    }
    return null;
  });
});

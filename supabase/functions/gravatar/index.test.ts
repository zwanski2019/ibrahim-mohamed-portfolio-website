/* global Deno */
import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { stub } from "https://deno.land/std@0.168.0/testing/mock.ts";
import { gravatarHandler } from "./index.ts";

Deno.test("returns profile for valid email", async () => {
  const profile = { entry: [{ displayName: "Alice" }] };
  const fetchStub = stub(globalThis, "fetch", () =>
    Promise.resolve(new Response(JSON.stringify(profile), { status: 200 })),
  );

  const req = new Request("http://localhost", {
    method: "POST",
    body: JSON.stringify({ email: "test@example.com" }),
  });

  const res = await gravatarHandler(req);
  const body = await res.json();

  assertEquals(res.status, 200);
  assertEquals(body.entry[0].displayName, "Alice");

  fetchStub.restore();
});

Deno.test("returns 400 when email missing", async () => {
  const req = new Request("http://localhost", {
    method: "POST",
    body: JSON.stringify({}),
  });

  const res = await gravatarHandler(req);
  const body = await res.json();

  assertEquals(res.status, 400);
  assertEquals(body.error, "Email is required");
});

Deno.test("handles invalid response from gravatar", async () => {
  const fetchStub = stub(globalThis, "fetch", () =>
    Promise.resolve(new Response("invalid", { status: 500 })),
  );

  const req = new Request("http://localhost", {
    method: "POST",
    body: JSON.stringify({ email: "test@example.com" }),
  });

  const res = await gravatarHandler(req);
  const body = await res.json();

  assertEquals(res.status, 502);
  assertEquals(body.error, "Failed to fetch profile");

  fetchStub.restore();
});

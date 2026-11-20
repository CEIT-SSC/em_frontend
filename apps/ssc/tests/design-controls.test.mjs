import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Button, PhoneNumberField, TextField } from "@ssc/ui";

const render = (component, props) => renderToStaticMarkup(React.createElement(component, props));

test("buttons prevent activation when disabled or loading and default to non-submit", () => {
  for (const state of [{ disable: true }, { disabled: true }, { loading: true }]) {
    assert.match(render(Button, { label: "Save", ...state }), /disabled=""/);
  }
  assert.match(render(Button, { label: "Save", loading: true }), /aria-busy="true"/);
  assert.match(render(Button, { label: "Cancel" }), /type="button"/);
  assert.match(render(Button, { label: "Save", type: "submit" }), /type="submit"/);
});

test("text fields associate labels, errors, and help with their input", () => {
  const html = render(TextField, { id: "email", name: "email", label: "Email", errorText: "Invalid email", guidance: "Use your own email", "aria-describedby": "external-help" });
  assert.match(html, /<label[^>]+for="email"/);
  assert.match(html, /aria-invalid="true"/);
  assert.match(html, /aria-describedby="external-help email-error email-guidance"/);
  assert.match(html, /id="email-error"/);
  assert.match(html, /id="email-guidance"/);
  const readonly = render(TextField, { id: "name", name: "name", label: "Name", readonly: true, value: "User" });
  assert.match(readonly, /readOnly=""/);
  assert.doesNotMatch(readonly, /aria-invalid/);
});

test("phone fields preserve native constraints and identify the national number", () => {
  const html = render(PhoneNumberField, { id: "phone", name: "phone", label: "Phone", errorText: "Invalid number", maxLength: 10, disabled: true });
  assert.match(html, /<label[^>]+for="phone"/);
  assert.match(html, /type="tel"/);
  assert.match(html, /inputMode="numeric"/);
  assert.match(html, /autoComplete="tel-national"/);
  assert.match(html, /maxLength="10"/);
  assert.match(html, /disabled=""/);
  assert.match(html, /aria-describedby="phone-error"/);
});

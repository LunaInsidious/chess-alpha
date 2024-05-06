import {
  isArray,
  isDateOrUndefined,
  isFileOrUndefined,
  isKeysOf,
  isNumber,
  isString,
  isStringOrNumberOrSymbol,
} from "@/utils/typeGuard";

const sym1 = Symbol("symbol1");
const sym2 = Symbol("symbol2");

describe("Type Guard Tests", () => {
  describe("isString", () => {
    const testData: { value: unknown; expected: boolean }[] = [
      { value: "", expected: true },
      { value: new Date(), expected: false },
      { value: new File([""], "filename"), expected: false },
      { value: 123, expected: false },
      { value: sym1, expected: false },
      {
        value: { key1: "string", key2: "object" },
        expected: false,
      },
      { value: ["string", "array"], expected: false },
      { value: undefined, expected: false },
      { value: null, expected: false },
      { value: true, expected: false },
      { value: () => {}, expected: false },
    ];
    it.each(testData)(
      `inputが$valueの時、$expectedを返す`,
      ({ value, expected }) => {
        expect(isString(value)).toBe(expected);
      },
    );
  });

  describe("isNumber", () => {
    const testData: { value: unknown; expected: boolean }[] = [
      { value: "", expected: false },
      { value: new Date(), expected: false },
      { value: new File([""], "filename"), expected: false },
      { value: 123, expected: true },
      { value: sym1, expected: false },
      { value: { 1: 1, 2: 2, 3: 3 }, expected: false },
      { value: [123, 456], expected: false },
      { value: undefined, expected: false },
      { value: null, expected: false },
      { value: true, expected: false },
      { value: () => {}, expected: false },
    ];
    it.each(testData)(
      `inputが$valueの時、$expectedを返す`,
      ({ value, expected }) => {
        expect(isNumber(value)).toBe(expected);
      },
    );
  });

  describe("isDateOrUndefined", () => {
    const testData: { value: unknown; expected: boolean }[] = [
      { value: "", expected: false },
      { value: new Date(), expected: true },
      { value: new File([""], "filename"), expected: false },
      { value: 123, expected: false },
      { value: sym1, expected: false },
      {
        value: { key1: "string", key2: 1, key3: undefined },
        expected: false,
      },
      { value: [new Date(), undefined], expected: false },
      { value: undefined, expected: true },
      { value: null, expected: true },
      { value: true, expected: false },
      { value: () => {}, expected: false },
    ];
    it.each(testData)(
      `inputが$valueの時、$expectedを返す`,
      ({ value, expected }) => {
        expect(isDateOrUndefined(value)).toBe(expected);
      },
    );
  });

  describe("isFileOrUndefined", () => {
    const testData: { value: unknown; expected: boolean }[] = [
      { value: "", expected: false },
      { value: new Date(), expected: false },
      { value: new File([""], "filename"), expected: true },
      { value: 123, expected: false },
      { value: sym1, expected: false },
      {
        value: { key1: "string", key2: 1, key3: undefined },
        expected: false,
      },
      {
        value: [new File([""], "filename"), undefined],
        expected: false,
      },
      { value: undefined, expected: true },
      { value: null, expected: true },
      { value: true, expected: false },
      { value: () => {}, expected: false },
    ];
    it.each(testData)(
      `inputが$valueの時、$expectedを返す`,
      ({ value, expected }) => {
        expect(isFileOrUndefined(value)).toBe(expected);
      },
    );
  });

  describe("isStringOrNumberOrSymbol", () => {
    const testData: {
      value: unknown;
      expected: boolean;
    }[] = [
      { value: "", expected: true },
      { value: new Date(), expected: false },
      {
        value: new File([""], "filename"),
        expected: false,
      },
      { value: 123, expected: true },
      { value: sym1, expected: true },
      {
        value: { key1: "string", key2: 1, key3: sym1 },
        expected: false,
      },
      { value: ["string", "array"], expected: false },
      {
        value: ["string or number", 123],
        expected: false,
      },
      { value: undefined, expected: false },
      { value: null, expected: false },
      { value: true, expected: false },
      { value: () => {}, expected: false },
    ];
    it.each(testData)(
      `inputが$valueの時、$expectedを返す`,
      ({ value, expected }) => {
        expect(isStringOrNumberOrSymbol(value)).toBe(expected);
      },
    );
  });

  describe("isArray(第二引数なし)", () => {
    const testData: { value: unknown; expected: boolean }[] = [
      { value: "", expected: false },
      {
        value: { key1: "string", key2: 1, key3: undefined },
        expected: false,
      },
      { value: [123, 456], expected: true },
      { value: ["string", "array"], expected: true },
      { value: [sym1, sym2], expected: true },
      { value: [new Date(), undefined], expected: true },
      {
        value: [new File([""], "filename"), undefined],
        expected: true,
      },
      {
        value: [
          { key1: "array", key2: "of", key3: "object1" },
          { key1: "array", key2: "of", key3: "object2" },
        ],
        expected: true,
      },
      { value: ["string or number", 123], expected: true },
      { value: [undefined], expected: true },
      { value: null, expected: false },
      { value: true, expected: false },
      { value: () => {}, expected: false },
    ];
    it.each(testData)(
      `inputが$valueの時、$expectedを返す`,
      ({ value, expected }) => {
        // unknown[]であることを保証
        expect(isArray(value)).toBe(expected);
      },
    );
  });

  describe("isArray(第二引数:isString)", () => {
    const testData: { value: unknown; expected: boolean }[] = [
      { value: "", expected: false },
      {
        value: { key1: "string", key2: 1, key3: undefined },
        expected: false,
      },
      { value: [123, 456], expected: false },
      { value: ["string", "array"], expected: true },
      { value: [sym1, sym2], expected: false },
      { value: [new Date(), undefined], expected: false },
      {
        value: [new File([""], "filename"), undefined],
        expected: false,
      },
      {
        value: [
          { key1: "array", key2: "of", key3: "object1" },
          { key1: "array", key2: "of", key3: "object2" },
        ],
        expected: false,
      },
      { value: ["string or number", 123], expected: false },
      { value: [undefined], expected: false },
      { value: null, expected: false },
      { value: true, expected: false },
      { value: () => {}, expected: false },
    ];
    it.each(testData)(
      `inputが$valueの時、$expectedを返す`,
      ({ value, expected }) => {
        // string[]であることを保証
        expect(isArray(value, isString)).toBe(expected);
      },
    );
  });

  describe("isKeyOf", () => {
    const obj = {
      1: "value1",
      [sym1]: "value2",
      test: "value3",
    };

    const testData: { value: unknown; expected: boolean }[] = [
      { value: "1", expected: true },
      { value: 1, expected: true },
      { value: sym1, expected: true },
      { value: "test", expected: true },
      { value: ["1", sym1, "test"], expected: true },
      { value: ["1", sym1], expected: true },
      { value: [], expected: true },
      { value: "2", expected: false },
      { value: 2, expected: false },
      { value: sym2, expected: false },
      { value: "test2", expected: false },
      { value: [1, "sym1", "test"], expected: false },
      { value: ["1", sym2], expected: false },
    ];
    it.each(testData)(
      `inputが$valueの時、$expectedを返す`,
      ({ value, expected }) => {
        expect(isKeysOf(value, obj)).toBe(expected);
      },
    );
  });
});

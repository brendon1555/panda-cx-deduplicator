import { describe, test, expect } from "vitest";
import { cx } from "../src";

describe("cx function", function () {
  test("Basic atomic classes", function () {
    const css = cx("color_red.500", "color_blue.500", "bg_red.500");
    expect(css).toBe("color_blue.500 bg_red.500");
  });
  test("Include boolean", function () {
    const css = cx("color_red.500", false, "bg_red.500", true);
    expect(css).toBe("color_red.500 bg_red.500");
  });
  test("Include null", function () {
    const css = cx("color_red.500", null, "bg_red.500", null);
    expect(css).toBe("color_red.500 bg_red.500");
  });
  test("Include undefined", function () {
    const css = cx("color_red.500", undefined, "bg_red.500", undefined);
    expect(css).toBe("color_red.500 bg_red.500");
  });
  test("Basic atomic classes, some within single string", function () {
    const css = cx("color_red.500 bg_red.500", "color_blue.500", "text_center");
    expect(css).toBe("color_blue.500 bg_red.500 text_center");
  });
  test("Basic atomic classes, some within single string, double spaced", function () {
    const css = cx("color_red.500  bg_red.500", "color_blue.500", "text_center");
    expect(css).toBe("color_blue.500 bg_red.500 text_center");
  });
  test("Child selection syntax", function () {
    const css = cx("[&_>_span]:bg_blue.100", "[&_>_span]:bg_green.100", "font_semibold");
    expect(css).toBe("[&_>_span]:bg_green.100 font_semibold");
  });
  test("State selector syntax", function () {
    const css = cx("hover:text_red.500", "font_semibold", "text_center", "hover:text_blue.100");
    expect(css).toBe("hover:text_blue.100 font_semibold text_center");
  });
  test("Include non atomic classes", function () {
    const css = cx("hover:text_red.500", "this-is-a-class", "text_center", "hover:text_blue.100");
    expect(css).toBe("hover:text_blue.100 text_center this-is-a-class");
  });
  test("Include slot recipes", function () {
    const css = cx("hover:text_red.500", "hover:text_blue.100", "text_center", "slot-recipe__one slot-recipe__two");
    expect(css).toBe("hover:text_blue.100 text_center slot-recipe__one slot-recipe__two");
  });
});

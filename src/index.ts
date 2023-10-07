/**
 * An upgraded version of the `cx` function from panda
 * that deduplicates atomic classes based on the property
 */

type Argument = string | boolean | null | undefined;

const regex = /(.*\]:)?[^_]*(?=_)|.*(?=\]:)/g;

function cx(...args: Argument[]) {
  // Get all args passed to cx, only keep truthy string values
  const presentClassNames: string[] = Array.prototype.slice
    .call(args)
    .filter(Boolean)
    .filter((arg) => typeof arg === "string");

  const atomicClasses: { [k: string]: string } = {};
  const nonAtomicClasses: string[] = [];

  presentClassNames.forEach((arg) => {
    // Break args down into individual class names, stripping any empty strings
    const individualClassNames = arg ? arg.split(" ").filter(Boolean) : [];

    individualClassNames.forEach((className) => {
      // Check for atomic class format match
      const matches = className.match(regex);
      if (!className.includes("__") /* Slot recipes contain `__` */ && matches) {
        // Grab the first part of the class name (before the first '_', but after any `[...]:`)
        // This is the className defined for the atomic property (plus prefixes)
        const key = matches[0];
        atomicClasses[key] = className;
      } else {
        // Just push through non atomic classes
        nonAtomicClasses.push(className);
      }
    });
  });

  const result: string[] = [];

  // Push atomic classes first
  for (const key in atomicClasses) {
    if (Object.prototype.hasOwnProperty.call(atomicClasses, key)) {
      result.push(atomicClasses[key]);
    }
  }
  // Push non atomic classes last
  result.push(...nonAtomicClasses);
  // Return a string of all the classes joined by a space
  return result.join(" ");
}

export { cx };

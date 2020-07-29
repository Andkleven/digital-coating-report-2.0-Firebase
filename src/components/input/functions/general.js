export const focusNextInput = e => {
  const form = e.target.form;
  const index = Array.prototype.indexOf.call(form, e.target);

  const currentElement = form.elements[index];
  const isSelect = element => element.id.includes("react-select-");

  const skip = (e, skipElements = 1) => {
    while (index + skipElements <= form.elements.length) {
      const element = form.elements[index + skipElements];
      if (element) {
        if (
          ["INPUT", "TEXTAREA"].includes(element.tagName) ||
          element.type === "submit"
        ) {
          element.focus();
          break;
        }
      } else {
        console.log(element);
      }
      skipElements += 1;
    }
  };

  if (isSelect(currentElement)) {
    // Select
    // react-select inputs contains 2 inputs, so we have to skip these

    /**
     * Temporary attempt at better UX for selects
     *
     * A better fix may be to change submit buttons type to "button",
     * as this allows for more flexibility and a more uniform solution
     * for different inputs.
     */
    if (e.key === "Enter") {
      if (e.target.value) {
        skip(e, 2);
      } else {
        e.preventDefault();
      }
      console.log("Enter");
    }
  } else {
    // Input and text area
    e.preventDefault();
    skip(e);
  }
};
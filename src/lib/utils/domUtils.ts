/**
 * Switches the application theme by adding or removing the "dark" class on the HTML element.
 *
 * @param {string} value - The theme value ("dark" to enable dark mode, any other value to disable).
 */
export function switchAppTheme(value: string) {
  const html = document.documentElement;
  if (value === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
}

/**
 * Switches the form preview theme by adding or removing the "dark" class on elements with the "form-content" class.
 *
 * @param {string} value - The theme value ("dark" to enable dark mode, any other value to disable).
 */
export function switchFormTheme(value: string) {
  const formContainers = document.querySelectorAll(".form-content");

  formContainers.forEach((container) => {
    if (value === "dark") {
      container.classList.add("dark");
    } else {
      container.classList.remove("dark");
    }
  });
}

export function switchTheme(value: string) {
  const html = document.documentElement;
  if (value === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
}

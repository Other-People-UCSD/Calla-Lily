/**
 * This script is included in the homepage and 
 * pages that have the 'theme' attribute in the Jekyll front matter.
 * 
 * When the page is loaded, check which theme function to execute.
 */

/**
 * Pages that specify theme.
 * Initialize the webpage as envisioned in monospaced dark mode without the default title.
 * The newsletter embed is removed to keep the focus on the content.
 */
export function pageChange(theme) {
    const isAlreadyDark = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ||
        document.documentElement && document.documentElement.getAttribute('data-theme') === 'dark');
    if (theme === 'dark' && !isAlreadyDark) {
        setDarkTheme();
    } else if (!isAlreadyDark) {
        setLightTheme();
    }
}

/**
 * Sets dark theme regardless of the user's client preference.
 */
export function setDarkTheme() {
    const html = document.querySelector('html');
    html.setAttribute('data-theme', 'dark');
}

/**
 * Sets light theme regardless of the user's client preference.
 */
export function setLightTheme() {
    const html = document.querySelector('html');
    html.setAttribute('data-theme', 'light');
}
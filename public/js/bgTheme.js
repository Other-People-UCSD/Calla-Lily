/**
 * This script is included in the homepage and 
 * pages that have the 'theme' attribute in the Jekyll front matter.
 * 
 * When the page is loaded, check which theme function to execute.
 */
window.addEventListener('DOMContentLoaded', function() {
    let w2b = this.document.querySelector('.w2b');
    if (w2b !== null) {
        homepageChange();
    }

    let dark = this.document.getElementById('dark');
    if (dark !== null) {
        let links = this.document.querySelectorAll('.post-nav a');
        for (let i = 0, len = links.length; i < len; i++) {
            links[i].style.setProperty("color", "#fff");
        }
        pageChange('dark');
    }
});

/**
 * Homepage only.
 * When the user scrolls to the "keep reading" section marked by the "w2b" class, 
 * the style of the page changes to dark mode. 
 * If the user's client preference is dark mode, scrolling beyond the "keep reading" section
 * will cause that section to become light mode instead.
 */
export function homepageChange() {
    var winH = window.innerHeight / 3.5;
    window.addEventListener('scroll', function() {
        let wScroll = this.scrollY;
        let bgChange = this.document.querySelector('.w2b').offsetTop;
        
        if (wScroll >= bgChange - winH) {
            this.document.querySelector('.posts').style.setProperty("border-color", "var(--background-color)");
            setDarkTheme();
        } else {
            this.document.querySelector('.posts').style.setProperty("border-color", "var(--light-text-color)");
            setLightTheme();
        }
    });
}

/**
 * Pages that specify theme.
 * Initialize the webpage as envisioned in monospaced dark mode without the default title.
 * The newsletter embed is removed to keep the focus on the content.
 */
export function pageChange(theme) {
    if (theme === 'dark') {
        setDarkTheme();
    } else {
        setLightTheme();
    }
}

/**
 * Sets dark theme regardless of the user's client preference.
 */
export function setDarkTheme() {
    // General
    bodyElem = this.document.querySelector('body');
    bodyElem.style.setProperty("background-color", "var(--light-text-color)");
    bodyElem.style.setProperty("color","var(--background-color)");
    
    // Header
    headerElem = this.document.querySelector('header');
    headerElem.style.setProperty("background-color", "var(--light-text-color)");
    headerElem.style.setProperty("color", "var(--background-color)");
    announcement = this.document.querySelector('.announcement');
    announcement.style.setProperty("background-color", "var(--button-background)");
    this.document.querySelector('#close-notice').style.setProperty("background-color", "var(--button-background)");

    // Footer Logo
    this.document.querySelector('.logoOutline').style.setProperty("stroke", "var(--light-text-color)");
    this.document.querySelector('#logo').style.setProperty("fill", "var(--background-color)");
}

/**
 * Sets light theme regardless of the user's client preference.
 */
export function setLightTheme() {
    // General
    bodyElem = this.document.querySelector('body');
    bodyElem.style.setProperty("background-color", "var(--background-color)");
    bodyElem.style.setProperty("color","var(--light-text-color)");

    // Header
    headerElem = this.document.querySelector('header');
    headerElem.style.setProperty("background-color", "var(--background-color)");
    headerElem.style.setProperty("color", "var(--light-text-color)");
    announcement = this.document.querySelector('.announcement');
    announcement.style.setProperty("background-color", "var(--button-background)");
    this.document.querySelector('#close-notice').style.setProperty("background-color", "var(--button-background)");

    // Footer Logo
    this.document.querySelector('.logoOutline').style.setProperty("stroke", "var(--background-color)");
    this.document.querySelector('#logo').style.setProperty("fill", "var(--light-text-color)");
}
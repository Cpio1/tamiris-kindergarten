import { DEFAULT_LOCALE } from "./translations";

export const LOCALE_STORAGE_KEY = "tamiris-locale";

/**
 * Runs before paint: if a non-default language is saved, hide the page until
 * React swaps the texts, so visitors don't see a flash of the other language.
 * The language is stored in localStorage, so it is kept when the site switches
 * between the desktop and mobile versions.
 */
export const localeBootScript = `(function(){try{var l=localStorage.getItem("${LOCALE_STORAGE_KEY}");if(l&&l!=="${DEFAULT_LOCALE}"){var d=document.documentElement;d.lang=l;d.classList.add("locale-pending");setTimeout(function(){d.classList.remove("locale-pending")},1200)}}catch(e){}})();`;

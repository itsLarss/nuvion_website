document.getElementById("year").textContent = new Date().getFullYear();

// --- Download Links (ersetzen!) ---
const LINKS = {
    windows: "#",
    mac: "#",
    linux: "#",
};

// OS-Erkennung für Primary-Button
const ua = navigator.userAgent.toLowerCase();
let primary = LINKS.windows;
if (ua.includes("mac")) primary = LINKS.mac;
if (ua.includes("linux")) primary = LINKS.linux;

const setHref = (id, href) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute("href", href);
};

setHref("dlPrimary", primary);
setHref("dlWindows", LINKS.windows);
setHref("dlMac", LINKS.mac);
setHref("dlLinux", LINKS.linux);

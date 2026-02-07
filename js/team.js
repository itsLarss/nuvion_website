document.getElementById("year").textContent = new Date().getFullYear();

// Team-Daten: anpassen
const TEAM = [
    { name: "Lyserra_", role: "Owner", tag: "Management", skin: "Lyserra_" },
    { name: "DevMax", role: "Developer", tag: "Backend", skin: "KingAhorn007" },
];

const grid = document.getElementById("teamGrid");

grid.innerHTML = TEAM.map(m => `
  <div class="member">
    <div class="skinbox">
      <img
        src="https://mc-heads.net/body/${encodeURIComponent(m.skin)}/160"
        alt="${m.name}"
        width="160"
        height="160"
        style="image-rendering: pixelated;"
      />
    </div>
    <div class="meta">
      <div>
        <div style="font-weight:800">${m.name}</div>
        <div style="color:rgba(210,243,220,.72); font-size:13px">${m.role}</div>
      </div>
      <div class="tag">${m.tag}</div>
    </div>
  </div>
`).join("");

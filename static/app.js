const ICONES = {
  programme:   "🏫",
  cours:       "📚",
  session:     "📅",
  groupecours: "👥",
  etudiant:    "🎓"
};

const TYPES_FR = {
  programme:   "Programme",
  cours:       "Cours",
  session:     "Session",
  groupecours: "Groupe-cours",
  etudiant:    "Étudiant"
};

let noeudActif = null;

async function chargerArbre() {
  const reponse = await fetch("/api/arbre");
  const donnees = await reponse.json();
  const conteneur = document.getElementById("arbre");
  conteneur.appendChild(construireNoeud(donnees, true));
}

function construireNoeud(data, ouvert = false) {
  const div = document.createElement("div");
  div.className = `noeud type-${data.type}`;

  // Ligne cliquable
  const ligne = document.createElement("div");
  ligne.className = "noeud-ligne";

  const toggle = document.createElement("span");
  toggle.className = "toggle";
  toggle.textContent = data.enfants?.length ? (ouvert ? "▾" : "▸") : "";

  const icone = document.createElement("span");
  icone.className = "icone";
  icone.textContent = ICONES[data.type] ?? "•";

  const nom = document.createElement("span");
  nom.className = "noeud-nom";
  nom.textContent = data.nom;

  const badge = document.createElement("span");
  badge.className = "badge-moy";
  badge.textContent = `${data.moyenne}%`;

  ligne.append(toggle, icone, nom, badge);
  div.appendChild(ligne);

  // Enfants
  let enfantsDiv = null;
  if (data.enfants?.length) {
    enfantsDiv = document.createElement("div");
    enfantsDiv.className = "noeud-enfants" + (ouvert ? "" : " cache");
    data.enfants.forEach(enfant => {
      enfantsDiv.appendChild(construireNoeud(enfant));
    });
    div.appendChild(enfantsDiv);

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const cache = enfantsDiv.classList.toggle("cache");
      toggle.textContent = cache ? "▸" : "▾";
    });
  }

  // Clic sur la ligne → panneau détail
  ligne.addEventListener("click", () => {
    if (noeudActif) noeudActif.classList.remove("actif");
    ligne.classList.add("actif");
    noeudActif = ligne;
    afficherDetail(data);
  });

  return div;
}

function afficherDetail(data) {
  const panneau = document.getElementById("detail");
  panneau.innerHTML = "";

  const type = document.createElement("div");
  type.className = "detail-type";
  type.textContent = TYPES_FR[data.type] ?? data.type;

  const nom = document.createElement("div");
  nom.className = "detail-nom";
  nom.textContent = data.nom;

  const grille = document.createElement("div");
  grille.className = "stat-grille";
  grille.appendChild(carteStat(data.moyenne + "%", "Moyenne"));
  grille.appendChild(carteStat(data.nb_etudiants, "Étudiant" + (data.nb_etudiants > 1 ? "s" : "")));

  panneau.append(type, nom, grille);

  // Évaluations (feuilles seulement)
  if (data.type === "etudiant" && data.evaluations) {
    const titre = document.createElement("div");
    titre.className = "eval-titre";
    titre.textContent = "Évaluations";

    const liste = document.createElement("ul");
    liste.className = "eval-liste";

    Object.entries(data.evaluations).forEach(([nom_eval, note]) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${nom_eval}</span><span class="eval-note">${note}%</span>`;
      liste.appendChild(li);
    });

    panneau.append(titre, liste);
  }
}

function carteStat(valeur, label) {
  const carte = document.createElement("div");
  carte.className = "stat-carte";
  carte.innerHTML = `<div class="stat-valeur">${valeur}</div><div class="stat-label">${label}</div>`;
  return carte;
}

chargerArbre();

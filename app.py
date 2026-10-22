from flask import Flask, jsonify, render_template
from donnees import construire_programme

# -----------------------------------------------------------------------------
# MODE D'AFFICHAGE
# Changez cette variable pour choisir comment lancer l'application :
#   "web"      → interface graphique dans le navigateur (nécessite Flask)
#   "terminal" → affichage en arbre dans le terminal
# -----------------------------------------------------------------------------
MODE = "web"


programme = construire_programme()


# --- Mode terminal -----------------------------------------------------------

def afficher_arbre(noeud_dict: dict, niveau: int = 0) -> None:
    """Affiche récursivement l'arbre dans le terminal."""
    indentation = "  " * niveau
    print(f"{indentation}{noeud_dict['nom']} ({noeud_dict['moyenne']}%)")
    for enfant in noeud_dict.get("enfants", []):
        afficher_arbre(enfant, niveau + 1)


# --- Mode web ----------------------------------------------------------------

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/arbre")
def arbre():
    return jsonify(programme.to_dict())


# --- Point d'entrée ----------------------------------------------------------

if __name__ == "__main__":
    if MODE == "terminal":
        afficher_arbre(programme.to_dict())
    else:
        app.run(debug=True)
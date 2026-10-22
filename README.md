# Projet — Analyse de notes de cohortes

Ce projet est une petite application web Flask qui affiche les notes d'un programme technique sous forme d'arbre interactif.

## Structure du projet

```
projet_composite_naif/
├── app.py              # Serveur Flask — deux routes : / et /api/arbre
├── données.py          # Construction du jeu de données
├── models/
│   ├── etudiant.py     # Un étudiant et ses évaluations
│   ├── groupe_cours.py # Un groupe-cours (ex. Groupe 01)
│   ├── session.py      # Une session (ex. Automne 2026)
│   ├── cours.py        # Un cours (ex. 3D3)
│   └── programme.py    # Le programme au complet (racine)
├── templates/
│   └── index.html      # Interface web
└── static/
    ├── app.js
    └── style.css
```

## Installation et démarrage

Le projet peut s'exécuter de deux façons. Dans `app.py`, modifiez la variable `MODE` selon ce que vous voulez :

### Mode terminal (recommandé pour débuter)

```python
MODE = "terminal"
```

```bash
python app.py
```

Affiche l'arbre directement dans le terminal, sans navigateur ni dépendance externe :

```
Techniques de l'informatique (79.3%)
  3D3 — Programmation orientée objet (82.1%)
    Automne 2026 (76.5%)
      Groupe 01 (76.5%)
        Alice Tremblay (84.7%)
        Bob Nguyen (69.7%)
      ...
```

### Mode web

```python
MODE = "web"
```

```bash
python -m venv venv
source venv/bin/activate  # Sur Windows utilisez `venv\Scripts\activate`
pip install flask
python app.py
```

Ouvrez ensuite `http://localhost:5000` dans votre navigateur pour voir l'arbre interactif.

---

## Ce que vous devez comprendre

Ce cours est un cours de **programmation Python**. Le projet utilise une interface web pour rendre les données visuelles, mais **tout ce qui compte pour le cours se trouve dans le dossier `models/`** et dans `données.py`.

### Backend — ce qu'on vous demande de maîtriser

Le backend est la partie Python du projet : les classes, la logique métier, et la façon dont les données sont structurées.

- **`models/`** — Les cinq classes qui modélisent la hiérarchie académique. C'est ici que se trouve tout le code que vous devrez lire, analyser et éventuellement modifier.
- **`données.py`** — La fonction `construire_programme()` qui assemble un jeu de données de test. Elle montre comment les objets s'imbriquent les uns dans les autres.
- **`app.py`** — Le serveur Flask. Vous n'avez pas besoin de comprendre Flask en détail. Retenez juste que la route `/api/arbre` appelle `programme.to_dict()` et retourne le résultat en JSON — c'est ce qui alimente l'interface.

### Frontend — pour les curieux (non requis)

Le frontend est la partie qui s'exécute dans le navigateur. Vous n'avez **pas besoin** de comprendre cette partie pour suivre le cours — elle ne fera l'objet d'aucune évaluation.

- **`templates/index.html`** — La page HTML chargée par le navigateur. Elle appelle le fichier JavaScript.
- **`static/app.js`** — Le code JavaScript qui fait une requête à `/api/arbre`, récupère le JSON retourné par Python, et construit l'arbre visuel dans la page. Si vous êtes curieux de voir comment les données Python deviennent un arbre cliquable, c'est ici que ça se passe.
- **`static/style.css`** — La mise en forme visuelle de la page.

En résumé : Python produit les données (backend), JavaScript les affiche (frontend). Dans ce cours, on s'intéresse exclusivement au côté Python.

---

## Lecture préparatoire — Questions à se poser

Lisez l'ensemble du code avant votre prochaine séance. Ces questions vous aideront à orienter votre lecture — vous n'avez pas à les remettre.

**Sur la structure des données**

- Quelle est la hiérarchie des objets dans ce projet ? Dessinez-la sur papier (qui contient qui).
- Un `Etudiant` peut-il contenir d'autres objets ? Et un `Programme` ?
- Dans `données.py`, comment un étudiant se retrouve-t-il associé à un cours ?

**Sur les méthodes**

- Quelles méthodes sont définies dans *toutes* les classes de `models/` ?
- Que retourne `nb_etudiants()` dans `GroupeCours` ? Dans `Session` ? Dans `Cours` ?
- Comment `Session.moyenne()` calcule-t-elle la moyenne — à partir de quoi ?

**Sur `Programme`**

- Lisez attentivement `Programme.moyenne()`. Combien de niveaux de boucles imbriquées contient-elle ?
- Comparez `Programme.moyenne()`, `Programme.nb_etudiants()` et `Programme.to_dict()`. Qu'ont-elles en commun ?
- Les commentaires `⚠️` dans `Programme` signalent un problème. Essayez de le formuler en une phrase dans vos propres mots.
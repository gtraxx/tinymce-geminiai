# Geminai - TinyMCE Plugin (Universal Edition)

![License](https://img.shields.io/badge/License-GPLv3-blue.svg)
![Version](https://img.shields.io/badge/Version-1.0.0-green.svg)
![TinyMCE](https://img.shields.io/badge/TinyMCE-5%20%7C%206%20%7C%207-orange.svg)

**Geminiai** est un plugin universel pour l'éditeur **TinyMCE** permettant d'intégrer l'intelligence artificielle Google Gemini (Flash & Pro) directement dans vos interfaces de rédaction.

Conçu à l'origine pour l'écosystème **Magix CMS**, cette version "Universal" est totalement agnostique. Elle peut être intégrée dans n'importe quel projet web (PHP, Node.js, Python, etc.) nécessitant une assistance rédactionnelle intelligente et moderne.

---

## Fonctionnalités

* **Assistant Contextuel** : Analyse et transforme le texte sélectionné par l'utilisateur (correction, traduction, résumé).
* **Génération Spontanée** : Crée du contenu à partir d'un simple prompt à la position du curseur.
* **Sortie HTML Sémantique** : Force l'IA à répondre avec un code HTML propre, évitant les blocs Markdown inutiles.
* **Internationalisation (i18n)** : Support natif des fichiers de langue via le dossier `langs/`.
* **Architecture Sécurisée** : Utilise un "Pont API" (Bridge) côté serveur pour protéger vos clés API (exemple simple en PHP).

---

## Installation

1. Téléchargez le dépôt.
2. Copiez le dossier `geminiai` dans le répertoire des plugins de votre installation TinyMCE :
   `your-project/js/tinymce/plugins/geminiai/`

---

### Configuration

```javascript
tinymce.init({
    selector: '#my-editor',
    plugins: 'geminiai code lists',
    toolbar: 'undo redo | bold italic | geminiai',

    // Configuration spécifique au plugin Gemini AI
    geminiai_bridge_url: '/api/my-gemini-bridge.php',
    geminiai_default_prompt: 'Agis comme un expert SEO et : ',
    
    // Pour charger les traductions (ex: français)
    language: 'fr_FR', 
    language_url: '/js/tinymce/langs/fr_FR.js' 
});
```

---

## Configuration du Bridge (Serveur)

Ce plugin nécessite un script côté serveur pour communiquer avec l'API Google Gemini. Ce "bridge" permet de sécuriser votre clé API et de formater les requêtes avant l'envoi.

> [!IMPORTANT]
> Un exemple de fichier `bridge.php` est fourni dans ce dépôt pour servir de base à votre implémentation.

### Intégration Professionnelle (PHP Library)

Pour les environnements de production utilisant **Composer**, il est recommandé d'utiliser la bibliothèque PHP officielle pour une gestion robuste des erreurs et des modèles :

* **Bibliothèque recommandée** : `google-gemini-php/client`
* **Avantages** : Gestion native du streaming, support complet des modèles Pro/Flash, et conformité PSR.

Le plugin reste compatible quel que soit le moteur de votre bridge, tant que la réponse JSON respecte le format attendu (`{ "status": "success", "html": "..." }`).

---

## Configuration de TinyMCE

Pour activer le plugin, ajoutez `geminiai` à la liste de vos plugins et de votre barre d'outils, puis définissez l'URL de votre bridge.

### Paramètres disponibles

| Paramètre | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `geminiai_bridge_url` | `String` | **OUI** | URL vers votre script serveur (Bridge). |
| `geminiai_default_prompt` | `String` | Non | Texte pré-rempli dans l'assistant. |
| `geminiai_icon` | `String` | Non | Icône TinyMCE (par défaut : `ai-prompt`). |
| `geminiai_tooltip` | `String` | Non | Texte affiché au survol du bouton. |

---

## Traductions & Contributions

Le plugin supporte le système de localisation natif de TinyMCE.

* Les fichiers de langue se trouvent dans le dossier `langs/`.
* Pour ajouter une nouvelle langue, dupliquez `fr_FR.js` et adaptez les traductions.
* Les **Pull Requests** pour de nouvelles langues ou améliorations sont vivement encouragées !

---

## Auteur & Crédits

* **Développeur** : [Gerits Aurelien](https://github.com/gtraxx/)
* **Organisation** : [Magix CMS](https://github.com/magix-cms)
* **Site Officiel** : [www.magix-cms.com](https://www.magix-cms.com)

---

## Soutenir le projet

Si ce plugin vous est utile, vous pouvez soutenir le développement de l'écosystème Magix CMS :

[![Faire un don](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://www.paypal.com/donate/?business=BQBYN3XYGMDML&no_recurring=0&currency_code=EUR)

## Licence

Ce projet est sous licence **GPLv3**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
Copyright (C) 2008 - 2026 Gerits Aurelien (Magix CMS)
Ce programme est un logiciel libre ; vous pouvez le redistribuer et/ou le modifier selon les termes de la Licence Publique Générale GNU telle que publiée par la Free Software Foundation ; soit la version 3 de la Licence, ou (à votre discrétion) toute version ultérieure.

---
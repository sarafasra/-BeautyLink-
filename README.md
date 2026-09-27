BeautyLink ✨

BeautyLink est une plateforme web de mise en relation entre clients et professionnels de beauté.

Elle permet aux clients de découvrir des prestations de coiffure, maquillage et onglerie, consulter les profils et les avis des professionnels, puis effectuer une réservation en ligne.

🎯 Objectifs

Faciliter la recherche de prestations de beauté.

Mettre en relation clients et professionnels.

Permettre la gestion des prestations.

Permettre la réservation et le suivi des rendez-vous.

Consulter les profils et les avis des professionnels.

✨ Fonctionnalités principales

Client

Inscription et connexion.

Consultation des prestations.

Recherche par catégorie.

Consultation du profil d'un professionnel.

Consultation des avis.

Réservation d'une prestation.

Consultation et annulation des réservations.

Gestion des favoris.

Gestion du profil.

Professionnel

Inscription et connexion.

Gestion du profil.

Ajout, modification et suppression des prestations.

Gestion des réservations.

Acceptation ou refus des réservations.

Consultation des avis.

🛠️ Technologies utilisées

Frontend

React

JavaScript

Tailwind CSS

React Router

Axios

Lucide React

Backend

PHP

Laravel

Laravel Sanctum

MySQL

Outils

Visual Studio Code

Git / GitHub

Docker

Figma

Jira

🏗️ Architecture

Le projet est organisé en deux parties :

BeautyLinkApp/
├── backend/       # API Laravel
└── frontend/      # Application React

Le frontend communique avec l'API Laravel à travers des requêtes HTTP avec Axios.

👥 Rôles

BeautyLink possède deux types d'utilisateurs :

Client : recherche, consulte et réserve des prestations.

Professionnel : propose ses prestations et gère les réservations.

🗂️ Principales entités

User : informations du client ou professionnel.

Service : prestation proposée.

Catégorie : coiffure, maquillage ou onglerie.

Réservation : rendez-vous entre un client et un professionnel.

Avis : évaluation laissée par un client.

🔐 Authentification

L'authentification est réalisée avec Laravel Sanctum.

Après la connexion, l'utilisateur est redirigé selon son rôle :

Client → /client/dashboard
Professionnel → /dashboard

🚀 Installation

1. Cloner le projet

git clone <URL_DU_REPOSITORY>
cd BeautyLinkApp

2. Backend

cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve --port=8002

Configurer la base de données MySQL dans le fichier .env.

3. Frontend

Dans un autre terminal :

cd frontend
npm install
npm run dev

📌 Catégories

BeautyLink propose trois catégories :

Coiffure

Maquillage

Onglerie

📐 Diagrammes UML

Les diagrammes de conception du projet sont disponibles ici :

Diagramme de classes UML :![alt text](<class diagramme File Rouge-1.jpg>)

Diagramme de cas d'utilisation UML : ![alt text](<use case diagramme file rouge.png>)

Diagramme ERD  : ![alt text](<ERD diagramme file rouge.png>)


🐳 Docker

Le projet est également conteneurisé avec Docker afin de faciliter son installation et son exécution.

Les images Docker du projet sont disponibles sur Docker Hub :

- Backend : [sarafasraoui/beautylink-backend] (https://hub.docker.com/r/sarafasraoui/beautylink-backend)
- Frontend : [sarafasraoui/beautylink-frontend]  (https://hub.docker.com/r/sarafasraoui/beautylink-frontend)
Architecture Docker :

BeautyLinkApp/
├── backend/       # API Laravel
├── frontend/      # Application React
└── docker-compose.yml

📁 Git

Le projet utilise Git pour le suivi des versions et GitHub pour le dépôt distant.

Les fonctionnalités sont développées sur des branches séparées puis intégrées dans la branche principale.

👩‍💻 Projet

BeautyLink
Plateforme de mise en relation entre clients et professionnels de beauté.
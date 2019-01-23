# Rapport projet Localfood
## Choix des technologies
### Choix technologiques pour le backend :
Pour développer notre backend, nous avons utilisé les technologies suivantes :
- NodeJs
- Express
- REST ( au début de notre projet. A été abandonné après la 1ère démo de PDG)
- GraphQL (apollo-server-express)
- MongoDB

Le choix des technologies a fortement été influencé par le cours de TWEB et les exigences du projet de TWEB/MAC. De plus, ces technologies nous intéressaient énormément et nous souhaitions les apprendre et les mettre en pratique dans le cadre d'un gros projet.

Nous avons commencé le développement en partant sur une API REST car nous ne connaissions pas GraphQL. Lorsqu'il nous a été présenté durant le cours de TWEB, nous avons rapidement décidé de passer à cette technologie. Ce choix fût prit tant par curiosité pour cette technologie que pour les avantages qu'elle procure. Ce qui nous a réellement décidé est le fait que GraphQL permette de réellement séparer le développement front-end et back-end car les développeur du backend étaient régulièrement en attente de feedback des développeurs frontend et inversément ce qui nous pénalisait grandement.
De plus, nous rencontrions d'importants problèmes d'over-fetching ou d'under-fetching avec l'API REST. GraphQL offre l'énorme avantage de pouvoir sélectionner très précisément les données que le client souhaite récupérer réglant définitivement ce problème.

Nous avons donc décidé de passer à GraphQL et avons pour cela entièrement recodé l'API.

Nous avons choisi d'utiliser une base de données MongoDB car nous souhaitions profiter de la flexibilité offerte par les base de données orientées documents. Nous avons pu découvrir durant le projet les capacités ainsi que certaines limites de MongoDB et, notamment, la puissance de ses aggrégations, qui, après quelques longues heures de casse-tête pour comprendre leur fonctionnement, se sont avérées très utiles!

### Choix technologiques pour le frontend :
Pour développer notre frontend, nous avons utilisé les technologies suivantes:

- React
- Material-UI
- Apollo-client
- Leaflet

Nous avons souhaité utiliser React car c'est une technologie qui prend une place majeur sur le marché des technologies web. De plus, nous l'avons étudié durant le semestre dans le cours de TWEB et avions deux experts (bon d'accord, surtout un) à dispositions pour nous débloquer lorsque nous rencontrions des problèmes insumontables pour les pauvres novices que nous sommes. Le fait de l'utiliser dans ce projet nous a permis de le prendre bien en main et de bien intégrer son fonctionnement, ses possibilités et ses limites. De plus, nous voulions une technologie capable de s'adapter sur mobile et React, couplé à des librairies comme Material-UI le fait très bien.

Pour l'affichage de la carte, nous avons utilisé Leaflet car elle est disponible gratuitement et est open-source. De plus, elle s'intègre très bien avec React et nous étions secondés par un asistant expert en la matière qui nous l'a chaudement recommandé.

### Choix technologiques pour l'infrastructure :
Nous avons hébergé notre application sur Gitlab car, contrairement à certains de ses concurrents, il permet d'utiliser les fonctionnalités de Continuous Integration (CI) ce qui nous a permis de créer des pipelines de production automatisés qui se sont révélés extrêmement pratiques.
En effet, cela nous a permis de mettre en place des tests de qualités ainsi qu'un pipeline de mise en production automatisée basée sur des commits effectués sur des branches spécifiques.

Nous avons acheté le nom de domaine foodlocal.ch chez Infomaniak et avons décidé d'héberger notre application sur Google Cloud avec Kubernetes. Nous avons choisi Google Cloud car ils offraient un bonus de 300.- pour débuter, ce qui nous était suffisant pour la durée de notre projet. De plus, Google Cloud offre la possibilité de faire du scaling de l'application sans trop impacter le prix de l'hébergement.

L'appentissage et la mise en place de ces technologies se sont avérés vraiment complexes mais nous y sommes parvenus et avons pu, en prime, découvrir un peu le monde des DevOps.

## API

L'API est structurée de la façon suivante: 

- Les fichiers situés dans le dossier *API/src/graphql/schemas* constituent le schéma GraphQL. Ces fichiers définissent les appels que peut faire le client sur l'API ainsi que toutes les communications (paramètres requis, contenu des objets etc...).
- Chaque endpoint du schéma nécessite un resolver. Ces resolvers se trouvent dans le dossier *API/src/graphql/resolvers*. Les resolvers sont appelés automatiquement par GraphQL en fonction du endpoint appelé. Nous avons fait en sorte que le code des resolvers soit toujours le plus concis possible. En général, les resolvers se content de vérifier l'authentification du client ainsi que son autorisation (s'il possède les droits d'appeler cet endpoint ou non), puis ils appellent une fonction dans l'un des services de l'API.
- Les services se trouvent dans le dossier *API/src/graphql/services*. Les services effectuent tout le traitement des resolvers. C'est eux qui manipulent les données et qui font les appels à la base de données en se basant sur les modèles mongoose.
- Les modèles mongoose sont situés dans le dossier *API/src/graphql/models* 

### Requêtes et données

L'API offre de très nombreux endpoints. L'utilité de chaque endpoint est donnée en commentaires dans les fichiers du schéma GraphQL (dossier *API/src/graphql/schemas*).
### Tests
Nous avons effectué deux type de tests. Des tests unitaires qui teste les différents services et méthodes d'accès aux données et des tests d'intégration qui tests le fonctionnement de GraphQL.

Pour lancer les tests il faut exécuté la commande `npm test`dans le dossier *API*

## Deployment
Toutes les informations concerant le deployment sont accéssible dans le [README.md](./Deployment/README.md) dans le dossier [/Deployment](./Deployment).

## Utilisation
L'application est accessible à l'adresse: https://foodlocal.ch.
L'application est séparée en plusieurs onglets.

### L'acceuil
L'acceuil permet de voir les informations concernant le projet, en descendant dans la page, on trouvera la liste des producteurs ce situant autour de soit.
### La carte
La carte permet de voir ou se situent les producteurs autour de nous. Il y a la possibilité de les filtrer et de gérer la distance maximum de recherche.

En cliquant sur un marqueur sur la carte, on peut avoir un aperçu des information du point de vente. Il est possible d'accéder au informations complète en recliquant dessus. 

### Partie réseau sociale
Les utilisateurs connectés peuvent noter un producteur et suivre son actualité par le biais de notification.

### Producteurs

Les producteurs pourront gérer leur point de vente et leur produits lorsqu'ils sont connectés. Ils pourront aussi posté des actualités sur leur "mur".

### Lancer l'application en local

### Pour lancer un replica set MongoDB en local

Utiliser `run-rs` , pour ce faire aller dans un dossier temporaire et lancer les commandes.

```sh
npm install run-rs
run-rs -v 4.0.0
```

### Pour lancer l'api

- Aller dans le dossier [API](./API/) 
- Créé un fichier *.env* contenant les mêmes variables que le fichier [.env.default](./API/.env.default) avec vos données. Faites attentions de bien mettre les informations pour vous connectez au replica set de *run-rs*
- Lancer un terminal dans le dossier API
- Lancer la commande `npm install` pour installer les dépendances du projet
- Lancer la commande `npm start` pour lancer l'API
- Vous pourrez accéder à l'api à l'adresse: http://locahost:<portDu.env>

### Pour lancer le frontend

- Aller dans le dossier [FrontEnd](./FrontEnd) 
- Lancer un terminal dan sle dossier FrontEnd
- Lancer la commande `npm install`
- Lancer la commande `npm start`
- Vous pourrez accéder au frontend à l'addresse http://localhost:3000

## Problèmes rencontrés
### Connaissances
Le plus gros problème qu'on a rencontré c'est le fait de partir des technologies que l'on ne connaissait pas. Au fur et à mesure du semestre, nous découvrions des nouvelles technologies en MAC et TWEB et nous nous rendions compte qu'elle était beaucoup plus adpaté à notre problème.
Nous avons régulièrement pris le choix de refaire des parties en utilisant une nouvelle technologie par curiosité et pour l'évolutivité du projet dans le futur.
### Organisation
Nous avons pris le risque de regrouper les projets de MAC, TWEB et PDG ensemble. Cela nous a permis de nous concentrer sur un projet qui nous porte à coeur mais nous a posé des problèmes concernant la charge de travail que l'on c'est imposé. Il était difficile de respécter le demande de tous les cours sans augmenter le nombre de fonctionnalités et la complexité du projet.

### Pagination

### Infrastructure
La grande difficulté de la mise en production sur Google Cloud fut l'apprentissage de Kubernetes. L'apprentissage pour la mise en production de service et de deployment fut assez rapide mais la gestion des certificats pour l'HTTPS fut la première étape compliquée. 

Nous avons pris le choix de tous héberger sur Google Cloud et donc nous avons du mettre notre base de données mongo. Nous avons voulu rendre la base de donnée plsu robuste en la transformant en un replica set. Ceci à nécessiter beaucoup d'essaie mais grâce à la découverte de l'outils Helm, de nombreuses heures de configuration on pu être sauvé. Malgrés une réussite, je pense que Mongo Atlas est plus adapter à l'hébergement d'une telle base de données. Mais engendrerais des frais supplémentaires.

## Conclusion

Nous sommes très fière de notre idée et avons appris une quantité démesuré de chose en une durée de temps très réduite. Ce fut une super expérience et nous espérons pouvoir continuer ce projet pour pouvoir le mener à bien.

## Remerciements
Un grand merci à Paul, Miguel et Olivier pour leur aide durant des heures sombres de debugging et de nous avoir mener sur le droit chemin.

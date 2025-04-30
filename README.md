# Système de Calcul Distribué avec RabbitMQ & TypeScript

## Objectif du projet

Ce projet simule un système de calcul distribué basé sur RabbitMQ. Des clients génèrent automatiquement des requêtes de calcul (addition, soustraction, multiplication, division) envoyées via un exchange de type topic. Chaque worker est dédié à un type d'opération et s'abonne uniquement à la clé de routage correspondante. Après avoir effectué le calcul (avec un délai aléatoire simulant une charge), le worker renvoie le résultat dans une queue dédiée, lue par un consumer.

## Technologies utilisées

- RabbitMQ
- TypeScript
- Bibliothèque AMQP : amqplib
- Docker
- Node.js

## Installation et lancement du projet

### Prérequis
- Node.js
- Docker et Docker Compose

### Étapes d'installation

1. Cloner le dépôt :
git clone https://github.com/Louisrca/rabbitmq-project.git
cd rabbitmq-project

2. Installer les dépendances :
npm install

3. Lancer RabbitMQ via Docker :
docker-compose up -d

Interface Web RabbitMQ : http://localhost:15672  

Identifiants : user
Mot de passe : password

### Lancement des composants

1. **Démarrer le producteur** (client d'entrée) :
npm run dev producer add

2. **Démarrer les workers** (traitement des opérations) :
npm run dev consumers

3. **Démarrer le consommateur de sortie** (affichage des résultats) :
npm run dev OutputConsumer

## Utilisation des composants

### 1. InputProducer (Client producteur)
- Génère automatiquement des requêtes de calcul (deux nombres aléatoires)
- Sélectionne une opération aléatoire (add, sub, mul, div, all)
- Envoie un message à l'exchange avec la clé de routage appropriée (ex: operation.add)
- Format du message : `{ "n1": 5, "n2": 3 }`
- Intervalle d'envoi : entre 5 et 15 secondes

### 2. Workers (Consumers spécialisés)
- Chaque worker traite un type d'opération spécifique
- S'abonne à la clé de routage correspondant à son opération (ex: operation.mul)
- Simule un traitement avec un délai aléatoire de 5 à 15 secondes
- Calcule le résultat et l'envoie à la ResultQueue
- Format du résultat : `{ "n1": 5, "n2": 3, "op": "add", "result": 8 }`

### 3. OutputConsumer (Client de sortie)
- Consomme les messages depuis la ResultQueue
- Affiche les résultats dans la console
- Format affiché : calcul effectué et résultat obtenu
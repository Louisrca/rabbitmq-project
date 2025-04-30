# Système de Calcul Distribué avec RabbitMQ & TypeScript
Louis ROCCA - Nicolas BELLANGER - Yanis ARAR

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

Pour run rabbitmq en local, lancez la commande :

```bash
docker composer up -d
```
changez dans le fichier src/utils/connection_rabbitmq :
```javascript
const rabbitmq_url = process.env.RABBITMQ_URL_DEV;
```
rajoutez dans votre .env l'url adapté :
```env
RABBITMQ_URL_DEV= amqp://user:password@localhost:5672
## ou 
RABBITMQ_URL_DEV= amqp://guest:guest@localhost:5672 
```

### Étapes d'installation

1. Cloner le dépôt :
```bash
git clone https://github.com/Louisrca/rabbitmq-project.git
cd rabbitmq-project
```

2. Installer les dépendances :
```bash
npm install
```

Interface Web RabbitMQ : [infoexpertise.hopto.org:15680](http://infoexpertise.hopto.org:15680)

- Identifiants : user
- Mot de passe : password

### Lancement des composants
Ouvrir 3 terminaux, afin de pouvoir lancer les 3 instances de rabbitmq en simultané.

1. **Démarrer le producteur** (client d'entrée) :
```bash
npm run dev producer add
```

3. **Démarrer les workers** (traitement des opérations) :
```bash
npm run dev consumers
```

5. **Démarrer le consommateur de sortie** (affichage des résultats) :
```bash
npm run dev OutputConsumer
```

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

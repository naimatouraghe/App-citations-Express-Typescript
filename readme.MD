# template-express-typescript

Ce template backend node express avec typescript.

## Utilisation

Commande | Role
--- | --- 
`npm start` | Pour lancer le serveur de dev
`npm run tsbuild` | Pour build le projet dans le dossier dist

## Mettre le serveur en ligne sur Heroku

Commencer par build le projet avec 
`npm run tsbuild`

Creer une nouvelle app sur votre compte Heroku

Aller dans le dossier dist

```
cd dist
git init
git add .
git commit -m "build deployment"
heroku git:remote -a nomDeVotreAppHeroku
git push heroku master
```

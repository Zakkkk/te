# The Thought Exchange
The Thought Exchange was created to build an engaging space for civil discussions and disagreements.

Initially this project will be a front-end only project with the goal of eventually expanding it to add more user functionality with a backend.

The project is built with the following technologies:
  - Vue.js on the front end (with eventual typescript instead of js)
  - scss for stylesheets
  - yaml for the articles

All articles are saved in the form of :id.yml inside the public/data/ directory. There is a list.json file inside the same directory which lists all of the articles inside using an array. Inside of @/api/LoadArticles.js there are functions such as <code>loadArticleById</code>, <code>loadArticles</code>, <code>loadArticlesByAuthorId</code> and <code>getAuthorById</code> which pull the yaml files using axios, acting like a pseudo front-end api.
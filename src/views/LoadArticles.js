import yaml from 'js-yaml';
import axios from 'axios';
import exists from '@/util/exists';

async function loadArticleById(id, articleNotFound, names) {
  if (!exists(names)) {
    const listResponse = await axios.get(`/data/articles/list.json`);
    names = await listResponse.data.names;
  }

  // console.log(`names: ${names}, names.includes(${id}) = ${names.includes(id)}`)
  if (names.includes(parseInt(id))) {
    const articleResponse = await axios.get(`/data/articles/${id}.yml`);

    return yaml.load(articleResponse.data);
  } else {
    articleNotFound();
  }
}

async function loadArticles(amount, startingIndex, names, startAtStart=false) {
  // The startingIndex refers to the first index of the names[] variable. startingIndex of 3 does not necessarily mean the third article, just the third indexed article under the names array.
  if (!exists(names)) {
    const listResponse = await axios.get(`/data/articles/list.json`);
    names = await listResponse.data.names;
  }
  
  const articles = [];

  if (!startAtStart) names = [...names].reverse(); // less efficient method but im gonna kms if i keep spending more time on this. Ill save this for future backend zak

  for (
    let i = startingIndex;
    articles.length < amount;
    i += 1
  ) {
    if (i >= names.length) break;
    if (amount < articles.length) break; // do i need this?

    articles.push(await loadArticleById(
      parseInt(names[i]),
      () => console.log(`article id (${names[i]}) not found`),
      names
    ));
  }

  return {
    articles: articles,
    remaining: names.length-startingIndex-articles.length
  };
}

async function loadArticlesByAuthorId(id, amount, startingIndex, startAtStart) {
  // startAtStart = false -> we will load in reverse
  // the method:
  //  lets say we need 10 articles and 2 have already been loaded. we'll load 8 and see how many match the id we need until we've either searched all the articles, or gotten the number of articles we need

  const listResponse = await axios.get(`/data/articles/list.json`);
  const names = await listResponse.data.names;

  const articles = [];
  let remaining = 1;
  let numberOfArticlesEvaluated = 0;

  let i = 0;
  while (articles.length < amount) {
    // console.log(`loading ${amount - articles.length} starting from ${startingIndex + numberOfArticlesEvaluated}`)

    // console.log(`Want to load ${amount - articles.length} articles.`)
    // console.log(`Starting at index ${startingIndex + numberOfArticlesEvaluated} of the reversed array`)

    await loadArticles(
      amount - articles.length,
      startingIndex + numberOfArticlesEvaluated, //+ ((numberOfArticlesEvaluated != 0) ? -1 : 0), // shitty workaround i know. but basically this is kinda like the problem how the length of something is 7 but the 7th index doesnt exist. but for the very first time when we start we wanna start at 0 and not -1
      names, startAtStart
    ).then(response => {
      response.articles.forEach(async article => {
        if (article.author == id)  articles.push(article);
        // console.log(`checked article #${article.id}: ${article.title}:`)
        numberOfArticlesEvaluated++;
        // console.log('evaluated one more')
      });

      remaining = response.remaining;
    });

    if (numberOfArticlesEvaluated+startingIndex >= names.length) break;


    i++;
    if (i >= 100) { console.log('needed to break'); break; }
  }

  return {
    articles: articles,
    numberOfArticlesEvaluated: numberOfArticlesEvaluated,
    remaining: remaining // the number of articles that have yet to be evaluated
  };
}

export {
  loadArticleById,
  loadArticles,
  loadArticlesByAuthorId
};
const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  if(repositories.length = 0) {
    return response.status(401).json({error: "Repositories not found!"})
  }
  return response.status(201).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  if(title == null || url == null || techs == null) {
    return response.status(400).json({error: 'Please, send a title, url and a techs'})
  }

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);
  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  repositoryIndex = repositories.findindex((repository => repository.id === id));

  if (repositoryIndex == -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const repository = {
    title: title,
    url: url,
    techs: techs
  }

  repositories[repositoryIndex] = repository;

  return response.status(201).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex((repository => repository.id === id));

  if (repositoryIndex == -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex((repository => repository.id === id));

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const likes = ++repositories[repositoryIndex].likes;

  return response.json(likes);
});

module.exports = app;

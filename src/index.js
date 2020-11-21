import fs from 'fs';
import path from 'path';
import { popularClothes } from './values';

const express = require('express');
const graphqlHttp = require('express-graphql');
const cors = require('cors');
const { buildSchema } = require('graphql');

const schemaString = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');
const schema = buildSchema(schemaString);

const app = express();

const root = {
  getPopularClothes: () => popularClothes,
}

app.use(cors());

app.use('/graphql', graphqlHttp({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(8080);

console.log('Running a GraphQL API server at http://localhost:8080/graphql');

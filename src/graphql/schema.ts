import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Pokemon {
    id: Int!
    name: String!
    type: String!
    level: Int!
    trainer: String
  }

  type Query {
    pokemons: [Pokemon!]!
    pokemon(id: Int!): Pokemon
  }

  type Mutation {
    createPokemon(name: String!, type: String!, level: Int!, trainer: String): Pokemon!
    updatePokemon(id: Int!, name: String, type: String, level: Int, trainer: String): Pokemon
    deletePokemon(id: Int!): Boolean!
  }
`; 
import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type User {
    id: Int!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Ability {
    id: Int!
    name: String!
  }

  type Weakness {
    id: Int!
    name: String!
  }

  type Pokemon {
    id: Int!
    name: String!
    type: String!
    level: Int!
    trainer: String
    description: String
    height: Int
    weight: Float
    gender: String
    image: String
    hp: Int
    attack: Int
    defense: Int
    specialAttack: Int
    specialDefense: Int
    speed: Int
    abilities: [Ability!]!
    weaknesses: [Weakness!]!
  }

  type Query {
    pokemons(offset: Int = 0, limit: Int = 50): [Pokemon!]!
    pokemon(id: Int!): Pokemon
    pokemonsCount: Int!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    createPokemon(
      name: String!,
      type: String!,
      level: Int!,
      trainer: String,
      description: String,
      height: Int,
      weight: Float,
      gender: String,
      image: String,
      hp: Int,
      attack: Int,
      defense: Int,
      specialAttack: Int,
      specialDefense: Int,
      speed: Int
    ): Pokemon!
    updatePokemon(
      id: Int!,
      name: String,
      type: String,
      level: Int,
      trainer: String,
      description: String,
      height: Int,
      weight: Float,
      gender: String,
      image: String,
      hp: Int,
      attack: Int,
      defense: Int,
      specialAttack: Int,
      specialDefense: Int,
      speed: Int
    ): Pokemon
    deletePokemon(id: Int!): Boolean!
  }
`; 
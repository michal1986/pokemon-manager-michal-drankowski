Information from Michal:


So the total development time was more than 4 hours — I think around 13 hours. But I did that on purpose because I really wanted to refresh my knowledge of how GraphQL is properly used.
So… yeah, it took some time, but I think I'm ready to work with GraphQL now :) 


Things to improve:

 - we have authentication done in resolvers, but we have hardcoded password. Ideally we should add User model to schema (and db)
  - Filtering & sorting happening on the frontend side only
  - We lack that 'Suprise me' button
  - limiting pokemons happening on the backend side
  - totally forgot to add possibility to search by Pokedex number :) 

# Pokemon Manager

## Database Setup

### First Time Setup
1. Start the database:
```bash
docker-compose up -d
```

2. Create and apply the database schema (this will also run the seed):
```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```


3. Start app in http://192.168.1.101:3130/
```
npm run dev
```



### Development
To view and manage your database:
```bash
npx prisma studio
```



TIP: if you will name a new pokemon properly, e.g. 'amaura' or 'dottler', there is a big chance that image will appear, as we have images in /public pretty much for all of them

# 1. Login to get the token (use terminal commands)


curl -X POST http://localhost:3130/api/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { login(email: \"admin@pokemon.com\", password: \"pokemon123\") { token user { id email } } }"
  }'

# 2. Create a Pokemon (replace YOUR-TOKEN-HERE with the token from step 1)
curl -X POST http://localhost:3130/api/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {YOUR-TOKEN-HERE}" \
  -d '{
    "query": "mutation { createPokemon(name: \"Axew\", type: \"Dragon\", level: 5, trainer: \"Iris\", height: 60, weight: 18, image: \"axew.png\", description: \"A small dragon Pokémon with tusks that can cut through steel\", gender: \"♂\", hp: 46, attack: 87, defense: 60, specialAttack: 30, specialDefense: 40, speed: 57) { id name type } }"
  }'

# 3. Update a Pokemon (replace {id} with actual Pokemon ID)
curl -X POST http://localhost:3130/api/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {YOUR-TOKEN-HERE}Y" \
  -d '{
    "query": "mutation { updatePokemon(id: 22, name:\"Axew\") { id name level } }"
  }'

# 4. Delete a Pokemon (replace {id} with actual Pokemon ID)
curl -X POST http://localhost:3130/api/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {YOUR-TOKEN-HERE}" \
  -d '{
    "query": "mutation { deletePokemon(id: 21) }"
  }'
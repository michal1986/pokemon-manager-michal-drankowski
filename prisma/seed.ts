import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const pokemonData = [
  {
    name: 'Bulbasaur',
    type: 'Grass',
    level: 5,
    trainer: 'Professor Oak',
    height: 70,
    weight: 6.9,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
  },
  {
    name: 'Charmander',
    type: 'Fire',
    level: 5,
    trainer: 'Professor Oak',
    height: 60,
    weight: 8.5,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'
  },
  {
    name: 'Squirtle',
    type: 'Water',
    level: 5,
    trainer: 'Professor Oak',
    height: 50,
    weight: 9.0,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'
  },
  {
    name: 'Pikachu',
    type: 'Electric',
    level: 10,
    trainer: 'Ash',
    height: 40,
    weight: 6.0,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
  },
  {
    name: 'Jigglypuff',
    type: 'Normal',
    level: 8,
    trainer: 'Misty',
    height: 50,
    weight: 5.5,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png'
  },
  {
    name: 'Meowth',
    type: 'Normal',
    level: 12,
    trainer: 'Team Rocket',
    height: 40,
    weight: 4.2,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png'
  },
  {
    name: 'Psyduck',
    type: 'Water',
    level: 15,
    trainer: 'Misty',
    height: 80,
    weight: 19.6,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png'
  },
  {
    name: 'Growlithe',
    type: 'Fire',
    level: 18,
    trainer: 'Officer Jenny',
    height: 70,
    weight: 19.0,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png'
  },
  {
    name: 'Abra',
    type: 'Psychic',
    level: 20,
    trainer: 'Sabrina',
    height: 90,
    weight: 19.5,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/63.png'
  },
  {
    name: 'Machop',
    type: 'Fighting',
    level: 16,
    trainer: 'Bruno',
    height: 80,
    weight: 19.5,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png'
  },
  {
    name: 'Geodude',
    type: 'Rock',
    level: 14,
    trainer: 'Brock',
    height: 40,
    weight: 20.0,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png'
  },
  {
    name: 'Gastly',
    type: 'Ghost',
    level: 22,
    trainer: 'Agatha',
    height: 130,
    weight: 0.1,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png'
  },
  {
    name: 'Onix',
    type: 'Rock',
    level: 25,
    trainer: 'Brock',
    height: 880,
    weight: 210.0,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png'
  },
  {
    name: 'Drowzee',
    type: 'Psychic',
    level: 19,
    trainer: 'Sabrina',
    height: 100,
    weight: 32.4,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/96.png'
  },
  {
    name: 'Krabby',
    type: 'Water',
    level: 17,
    trainer: 'Misty',
    height: 40,
    weight: 6.5,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/98.png'
  },
  {
    name: 'Voltorb',
    type: 'Electric',
    level: 21,
    trainer: 'Lt. Surge',
    height: 50,
    weight: 10.4,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png'
  },
  {
    name: 'Exeggcute',
    type: 'Grass',
    level: 23,
    trainer: 'Erika',
    height: 40,
    weight: 2.5,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/102.png'
  },
  {
    name: 'Cubone',
    type: 'Ground',
    level: 24,
    trainer: 'Giovanni',
    height: 40,
    weight: 6.5,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/104.png'
  },
  {
    name: 'Hitmonlee',
    type: 'Fighting',
    level: 27,
    trainer: 'Bruno',
    height: 150,
    weight: 49.8,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/106.png'
  },
  {
    name: 'Lickitung',
    type: 'Normal',
    level: 26,
    trainer: 'Team Rocket',
    height: 120,
    weight: 65.5,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/108.png'
  }
];

async function main() {
  console.log('Start seeding...');

  try {
    // Create all pokemons
    for (const pokemon of pokemonData) {
      const result = await prisma.pokemon.create({
        data: pokemon,
      });
      console.log(`Created pokemon with id: ${result.id} - ${pokemon.name}`);
    }

    console.log('Seeding finished.');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
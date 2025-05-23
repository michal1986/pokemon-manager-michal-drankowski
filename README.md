Information from Michal:


So the total development time was more than 4 hours — I think around 10 hours. But I did that on purpose because I really wanted to refresh my knowledge of how GraphQL is properly used.
So… yeah, it took some time, but I think I’m ready to work with GraphQL now :) 


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
```

### Development
To view and manage your database:
```bash
npx prisma studio
```


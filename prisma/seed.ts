import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { securityConstants } from '../src/auth/constants';

const prisma = new PrismaClient();
async function main() {
  const alicePass = await hash('alice123', securityConstants.saltRounds);

  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      occupation: 'Engineer',
      introduction: "I'm an engineer at Prisma",
      password: alicePass,
      skills: {
        create: [
          {
            content: 'TypeScript',
            state: 'COMPLETED',
          },
          {
            content: 'GraphQL',
            state: 'RUNNING',
          },
        ],
      },
      projects: {
        create: [
          {
            title: 'Prisma',
            codeUrl: 'https://github.com/prisma/prisma',
            demoUrl: 'https://www.prisma.io',
            description: 'Next-generation ORM for Node.js and TypeScript',
            images: {
              create: [
                {
                  url: 'https://www.prisma.io/assets/images/prisma-logo.svg',
                },
              ],
            },
          },
          {
            title: 'Nexus',
            codeUrl: 'https://github.com/graphql-nexus/nexus',
            demoUrl: 'https://nexusjs.org',
            description: 'The Missing Piece to the GraphQL Ecosystem',
            images: {
              create: [
                {
                  url: 'https://nexusjs.org/img/logo.svg',
                },
              ],
            },
          },
        ],
      },
    },
  });

  const bobPass = await hash('bob123', securityConstants.saltRounds);

  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      occupation: 'Designer',
      introduction: "I'm a designer at Prisma",
      password: bobPass,
      skills: {
        create: [
          {
            content: 'Figma',
            state: 'COMPLETED',
          },
          {
            content: 'Sketch',
            state: 'RUNNING',
          },
        ],
      },
      projects: {
        create: [
          {
            title: 'Prisma',
            codeUrl: 'https://github.com/typeorm/typeorm',
            demoUrl: 'https://www.typeorm.io',
            description: 'TypeORM is an ORM that can run in NodeJS and others',
            images: {
              create: [
                {
                  url: 'https://www.typeorm.io/images/logo_big.png',
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log({ alice, bob });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

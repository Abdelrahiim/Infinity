import {
  Permision,
  PrismaClient,
  RoleType,
  PermisionType,
} from '@prisma/client';

const prisma = new PrismaClient();

const rolesData = [
  {
    roleName: RoleType.ADMIN,
    description: 'Admin Role for the application',
    RolePermision: {
      create: [
        {
          name: PermisionType.MANAGE,
        },
      ],
    },
  },
  {
    roleName: RoleType.GUEST,
    description: 'Guest Role for the application',
    RolePermision: {
      create: [
        {
          name: PermisionType.READ,
        },
      ],
    },
  },
  {
    roleName: RoleType.USER,
    description: 'User Role for the application',
    RolePermision: {
      create: [
        {
          name: PermisionType.READ,
        },
        {
          name: PermisionType.CREATE,
        },
        {
          name: PermisionType.UPDATE,
        },
      ],
    },
  },
];

/**
 * Function to seed roles data into the database.
 *
 * @return {Promise<void>} Resolves when the seeding is complete.
 */
const seedRoles = async (): Promise<void> => {
  try {
    await prisma.$transaction([
      ...rolesData.map((roleData) => prisma.role.create({ data: roleData })),
    ]);
  } catch (error) {
    console.log(error);
  }
};

async function seed() {
  await seedRoles();
}

await seed();
await prisma.$disconnect();

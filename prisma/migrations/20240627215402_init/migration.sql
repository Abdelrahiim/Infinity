-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('ADMIN', 'USER', 'GUEST');

-- CreateEnum
CREATE TYPE "PermisionType" AS ENUM ('READ', 'CREATE', 'UPDATE', 'DELETE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "twoWayAuth" BOOLEAN NOT NULL DEFAULT false,
    "emailVerified" TIMESTAMP(3),
    "provider" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imgId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileImage" (
    "id" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "alias" TEXT NOT NULL,

    CONSTRAINT "ProfileImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "roleName" "RoleType" NOT NULL DEFAULT 'GUEST',
    "description" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permision" (
    "id" TEXT NOT NULL,
    "name" "PermisionType" NOT NULL DEFAULT 'READ',

    CONSTRAINT "Permision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoleToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PermisionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileImage_id_key" ON "ProfileImage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_id_key" ON "Role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Permision_id_key" ON "Permision"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToUser_AB_unique" ON "_RoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToUser_B_index" ON "_RoleToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PermisionToRole_AB_unique" ON "_PermisionToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_PermisionToRole_B_index" ON "_PermisionToRole"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "ProfileImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermisionToRole" ADD CONSTRAINT "_PermisionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Permision"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermisionToRole" ADD CONSTRAINT "_PermisionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

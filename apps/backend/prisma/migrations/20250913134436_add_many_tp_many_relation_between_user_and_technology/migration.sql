-- CreateTable
CREATE TABLE "_UserTechnologies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserTechnologies_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserTechnologies_B_index" ON "_UserTechnologies"("B");

-- AddForeignKey
ALTER TABLE "_UserTechnologies" ADD CONSTRAINT "_UserTechnologies_A_fkey" FOREIGN KEY ("A") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTechnologies" ADD CONSTRAINT "_UserTechnologies_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Appointments" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "local" VARCHAR(40) NOT NULL,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id")
);

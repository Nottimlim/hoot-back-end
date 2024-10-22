// TODO:
import db from "../db/connection.js";
import Pet from "../models/model-pet.js";

const insertData = async () => {

    await db.dropDatabase();

    const pets = [
        {
            name: "Lucky",
            age: 11,
            breed: "Iguana"
        },
        {
            name: "Pata",
            age: 14,
            breed: "Doggy"
        },
    ]

    await Pet.create(pets);

    console.log('Pets have entered the database');

    await db.close();

}

insertData();
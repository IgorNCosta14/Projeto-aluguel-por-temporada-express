import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  await connection.query(
    `INSERT INTO PERMISSIONS(id, name, "isLandlord", "isAdmin", "createdAt")
    values(default,'user', false, false, 'now()'),
    (default,'landlord', true, false, 'now()'),
    (default,'admin', false, true, 'now()')
    `
  );

  await connection.close;
}

create().then(() => console.log("Permissions created!"));
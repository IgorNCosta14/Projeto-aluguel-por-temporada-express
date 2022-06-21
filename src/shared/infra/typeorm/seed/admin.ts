import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();
  const password = await hash("1234", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, password, email, cpf, "userPermission", "activeUser","createdAt")
    values('${id}', 'admin', '${password}', 'admin@admin.com.br', 'xxxxxxxxxxx', 3, true, 'now()')
    `
  );

  await connection.close;
}

create().then(() => console.log("User admin created!"));

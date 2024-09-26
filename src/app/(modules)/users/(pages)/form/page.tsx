"use client";

import { api } from "~/core/trpc/callers/react";
import updateUser from '../../module/services/updateUser';

export default function Page() {
  const createUser = api.users.updateUser.useMutation();
  function handleLogin() {
    createUser.mutate({
      id: "cm1irg41z0003n7b3eqdngu0j",
      email: "qfG9A@examp5le.com",
      firstName: "John2",
      address:[{
        id: 11,
        streetType: "Street",
        street: "Street34",
        number: "123",
        complement: "Complement",
        neighborhood: "Neighborhood",
        city: "City",
        state: "State",
        zipCode: "12345-678",
      },
      {
        id: 12,
        streetType: "Street25",
        street: "Street2",
        number: "1234",
        complement: "Complement",
        neighborhood: "Neighborhood",
        city: "City",
        state: "State",
        zipCode: "12345-678",
      }],
      role: {
        id: 2
      }
    });
}
    return (
      <>
        <button onClick={handleLogin}>Form</button>
      </>
    );
  }
import React from "react";
import UserInfo from "./_components/user-info";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";

interface UserProps {
  params: {
    id?: string;
  };
}

const User = async ({ params }: UserProps) => {
  const session = await getServerSession(authOptions);

  if(!session?.user || !params.id) {
    // TODO redirect to home
    return null
  }

  const user = await db.user.findFirst({
        where: {
            id: params.id
        },
        include: {
          musics: true
        }
    })

  return (
    <>
    {user &&
      <UserInfo user={user}/>
    }
    </>
  );
};

export default User;

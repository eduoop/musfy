import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <Card className="rounded-bl-none rounded-br-none">
      <CardContent className="flex items-center py-3 justify-between">
        <Image src={"/logo.png"} alt="musfy logo" height={65} width={65} />
        <Button variant={"outline"} size={"icon"} className="h-9 w-9"><MenuIcon/></Button>
      </CardContent>
    </Card>
  );
};

export default Header;

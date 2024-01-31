import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";

import SideMenu from "./SideMenu";

export default function Header() {
  return (
    <header>
      <Card className="!rounded-t-none">
        <CardContent className="flex items-center justify-between p-5">
          <Image src={"/logo.svg"} height={18} width={120} alt="Barber Shop" />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"outline"} size={"icon"}>
                <MenuIcon size={16} />
              </Button>
            </SheetTrigger>

            <SideMenu />
          </Sheet>
        </CardContent>
      </Card>
    </header>
  );
}

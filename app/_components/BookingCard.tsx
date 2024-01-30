import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export default function BookingCard() {
  return (
    <Card>
      <CardContent className="flex justify-between p-0 ">
        <div className="flex flex-col gap-[10px] p-5">
          <Badge className="w-fit bg-[#221C3D] text-primary hover:bg-[#221C3D]">
            Confirmado
          </Badge>

          <h2 className="font-bold">Corte de Cabelo</h2>

          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="link" />
              <AvatarFallback>YR</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">Vintage Barber</h3>
          </div>
        </div>

        <div className="flex min-w-[106px] max-w-[106px] flex-col items-center justify-center border-l border-secondary py-5">
          <p className="text-sm">Fevereiro</p>
          <p className="text-2xl">06</p>
          <p className="text-sm">09:45</p>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
export default function BookingItem() {
    return (
        <Card className="mt-3 rounded-xl p-0">
            <CardContent className="flex justify-between p-0">
                <div className="flex flex-col gap-2 p-5">
                    <Badge>Confirmado</Badge>
                    <h3>Corte de cabelo</h3>
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhcS1x_oRjzyj-FlAxy1W6f_3d1r7Bzcu1I7wR6I16BQ&s&ec=121657058" />
                        </Avatar>
                        <p>Vintage Barber</p>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center border-l px-5">
                    <p className="text-sm">Maio</p>
                    <p className="text-2xl">12</p>
                    <p className="text-sm">09:45</p>
                </div>
            </CardContent>
        </Card>
    );
}
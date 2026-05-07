import { Card, CardContent } from "@/app/_components/ui/card";

export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="mt-4">
    <Card className="rounded-none py-3">
      <CardContent>
        <p className="text-sm text-muted-foreground">
          &copy; {date} BarberShop. Todos os direitos reservados.
        </p>
      </CardContent>
    </Card>
    </footer>
  );
}
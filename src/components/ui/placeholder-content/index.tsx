import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "../card";

interface PlaceholderContentProps {
  children?: React.ReactNode;
}

export default function PlaceholderContent({ children }: PlaceholderContentProps) {
  return (
    <Card className="rounded-lg border-none mt-3">
      <CardContent className="p-2">
            
            {children}
            
      </CardContent>
    </Card>
  );
}

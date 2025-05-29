import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"

type CardWrapperProps = {
    title: string;
    description: string;
    children: ReactNode;
}

export const CardWrapper = ({ title, description, children }: CardWrapperProps) => {
    return <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>

}
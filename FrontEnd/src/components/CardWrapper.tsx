import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

type CardWrapperProps = {
  title: string;
  Label: string;
  backButtonHref: string;
  backButtonLabel: string;
  children: React.ReactNode;
};
const CardWrapper = ({
  title,
  Label,
  backButtonHref,
  children,
  backButtonLabel,
}: CardWrapperProps) => {
  return (
    <>
      <Card className="xl:w-1/4 md:w-1/2 shadow-md ">
        <CardHeader>
          <div className="flex flex-col gap-y-4 items-center justify-center">
            <h1 className="text-3xl font-semibold">{title}</h1>
            <p className="text-muted-foreground text-sm">{Label}</p>
          </div>
        </CardHeader>

        <CardContent>{children}</CardContent>

        <CardFooter>
          <Button
            variant="link"
            className="font-normal w-full"
            size="sm"
            asChild
          >
            <Link to={backButtonHref}>{backButtonLabel}</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardWrapper;

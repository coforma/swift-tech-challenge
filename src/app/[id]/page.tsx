"use client";
import { useContext, useEffect, useState } from "react";
// components
import {
  BannerCard,
  DetailsCards,
  InstitutionContext,
  Spinner,
} from "@/src/app/components";
import NotFound from "@/src/app/not-found";
// types
import { College } from "../types";

export default function InstitutionDetails({
  params,
}: {
  params: { id: number };
}) {
  const { institutionsObject } = useContext(InstitutionContext);
  const [loading, setLoading] = useState(true);
  const [selectedCollege, setSelectedCollege] = useState<College>();
  useEffect(() => {
    if (institutionsObject) {
      setSelectedCollege(institutionsObject[params.id]);
      setLoading(false);
    }
  }, [institutionsObject, params.id]);

  const View = !selectedCollege ? (
    <NotFound />
  ) : (
    <ul className="usa-card-group details_page">
      <BannerCard key={params.id} college={selectedCollege} id={params.id} />
      <DetailsCards key={`${params.id}-dets`} college={selectedCollege} />
    </ul>
  );

  return <main>{loading ? <Spinner /> : View}</main>;
}

"use client";
import { useEffect, useState } from "react";
// components
import { BannerCard, DetailsCards, Spinner } from "@/src/app/components";
import NotFound from "@/src/app/not-found";
// types
import { College } from "../types";
import { getInstitutionData } from "../utils/institutions";

export default function InstitutionDetails({
  params,
}: {
  params: { id: number };
}) {
  const [loading, setLoading] = useState(true);
  const [selectedCollege, setSelectedCollege] = useState<College>();
  useEffect(() => {
    getInstitutionData(Number(params.id)).then((institution) => {
      setSelectedCollege(institution);
      setLoading(false);
    });
  }, [params.id]);

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

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

const filterCollege = (institutionData: College[], id: number) => {
  return institutionData.filter((college) => college.id == id)[0];
};

export default function InstitutionDetails({
  params,
}: {
  params: { id: number };
}) {
  const { institutionData } = useContext(InstitutionContext);
  const [loading, setLoading] = useState(true);
  const [selectedCollege, setSelectedCollege] = useState<College>();
  useEffect(() => {
    if (institutionData) {
      setSelectedCollege(filterCollege(institutionData!, params.id));
      setLoading(false);
    }
  }, [institutionData, params.id]);

  const View = !selectedCollege ? (
    <NotFound />
  ) : (
    <ul className="usa-card-group">
      <BannerCard key={params.id} college={selectedCollege} />
      <DetailsCards key={`${params.id}-dets`} college={selectedCollege} />
    </ul>
  );

  return <main>{loading ? <Spinner /> : View}</main>;
}

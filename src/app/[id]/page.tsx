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

const filterCollege = (institutionsArray: College[], id: number) => {
  return institutionsArray.filter((college) => college.id == id)[0];
};

export default function InstitutionDetails({
  params,
}: {
  params: { id: number };
}) {
  const { institutionsArray } = useContext(InstitutionContext);
  const [loading, setLoading] = useState(true);
  const [selectedCollege, setSelectedCollege] = useState<College>();
  useEffect(() => {
    if (institutionsArray) {
      setSelectedCollege(filterCollege(institutionsArray!, params.id));
      setLoading(false);
    }
  }, [institutionsArray, params.id]);

  const View = !selectedCollege ? (
    <NotFound />
  ) : (
    <ul className="usa-card-group details_page">
      <BannerCard key={params.id} college={selectedCollege} />
      <DetailsCards key={`${params.id}-dets`} college={selectedCollege} />
    </ul>
  );

  return <main>{loading ? <Spinner /> : View}</main>;
}

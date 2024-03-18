"use client";
import { useContext, useEffect, useState } from "react";
// components
import {
  BannerCard,
  DetailsCards,
  InstitutionContext,
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

  const view = () => {
    return !selectedCollege ? (
      <NotFound />
    ) : (
      <ul className="usa-card-group">
        <BannerCard key={params.id} college={selectedCollege} />
        <DetailsCards key={`${params.id}-dets`} college={selectedCollege} />
      </ul>
    );
  };

  return <main>{loading ? <div>please wait...</div> : view()}</main>;
}

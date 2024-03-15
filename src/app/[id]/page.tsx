"use client";
import { useContext, useEffect, useState } from "react";
// components
import {
  CollegeCard,
  DetailsCards,
  InstitutionContext,
} from "@/src/app/components";
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
  const [selectedCollege, setSelectedCollege] = useState<College>();
  useEffect(() => {
    if (institutionData) {
      setSelectedCollege(filterCollege(institutionData!, params.id));
    }
  }, [institutionData, params.id]);
  return (
    <main>
      {!selectedCollege ? (
        <div>please wait...</div>
      ) : (
        <ul className="usa-card-group">
          <CollegeCard key={params.id} college={selectedCollege} />
          <DetailsCards key={`${params.id}-dets`} college={selectedCollege} />
        </ul>
      )}
    </main>
  );
}

"use client";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { getInstitutions } from "@/src/app/utils/institutions";
// import types
import { College } from "../../types";

export interface InstitutionContextShape {
  institutionData: College[] | undefined;
}

export const InstitutionContext = createContext<InstitutionContextShape>({
  institutionData: undefined as College[] | undefined,
});

export const InstitutionProvider = ({ children }: Props) => {
  const [institutionData, setInstitutionData] = useState<
    College[] | undefined
  >();

  const fetchInstitutions = async () => {
    try {
      const result = await getInstitutions();
      setInstitutionData(result);
    } catch (e: any) {
      throw new Error("Institution data could not be loaded.");
    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, []); // ← runs once on app load

  const providerValue = useMemo(
    () => ({
      institutionData,
    }),
    [institutionData],
  );

  return (
    <InstitutionContext.Provider value={providerValue}>
      {children}
    </InstitutionContext.Provider>
  );
};

interface Props {
  children?: ReactNode;
}

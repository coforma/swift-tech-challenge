"use client";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
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

  const providerValue = useMemo(
    () => ({
      institutionData,
    }),
    [], // define deps here
  );

  useEffect(() => {
    // TODO: put initial api call here
    setInstitutionData(undefined); // TODO: set institution data here
  }, []); // ← runs once on app load

  return (
    <InstitutionContext.Provider value={providerValue}>
      {children}
    </InstitutionContext.Provider>
  );
};

interface Props {
  children?: ReactNode;
}

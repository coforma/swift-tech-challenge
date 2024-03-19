"use client";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { getInstitutions } from "@/src/app/utils/institutions";
// import types
import { College } from "../../types";

export interface InstitutionContextShape {
  institutionsArray: College[] | undefined;
  institutionsObject: { [key: string]: College } | undefined;
}

export const InstitutionContext = createContext<InstitutionContextShape>({
  institutionsArray: undefined as College[] | undefined,
  institutionsObject: undefined as { [key: string]: College } | undefined,
});

export const InstitutionProvider = ({ children }: Props) => {
  const [institutionsArray, setInstitutionsArray] = useState<
    College[] | undefined
  >();
  const [institutionsObject, setInstitutionsObject] = useState<
    { [key: string]: College } | undefined
  >();

  const fetchInstitutions = async () => {
    try {
      const result = await getInstitutions();
      setInstitutionsArray(result);
      // create object from array, indexed by institution id
      const objectForm: { [key: string]: College } = result.reduce(
        (acc, val) => ({ ...acc, [val.id]: val }),
        {},
      );
      setInstitutionsObject(objectForm);
    } catch (e: any) {
      throw new Error("Institution data could not be loaded.");
    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, []); // ← runs once on app load

  const providerValue = useMemo(
    () => ({
      institutionsArray,
      institutionsObject,
    }),
    [institutionsArray, institutionsObject],
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

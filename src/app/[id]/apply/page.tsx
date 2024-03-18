import { ApplicationForm } from "../../components/form/ApplicationForm";

export default function Page({ params }: Props) {
  return <ApplicationForm institutionId={params.id} />;
}

type Props = {
  params: {
    id: string;
  };
};

import { ApplicationForm } from "../../components/form/ApplicationForm";

export default function ApplyPage({ params }: Props) {
  return <ApplicationForm institutionId={params.id} />;
}

type Props = {
  params: {
    id: string;
  };
};

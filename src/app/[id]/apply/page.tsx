import { AppForm } from "../../components/form/AppForm";

export default function ApplyPage({ params }: Props) {
  return <AppForm institutionId={params.id} />;
}

type Props = {
  params: {
    id: string;
  };
};

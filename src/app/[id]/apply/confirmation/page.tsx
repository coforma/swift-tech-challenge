export default function ConfirmationPage({ params }: Props) {
  return <div>{`Successfully completed application for ${params.id}`}</div>;
}

type Props = {
  params: {
    id: string;
  };
};

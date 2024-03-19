import { useState } from "react";
import fallbackImage from "../../assets/default-institution-image.png";
import Image from "next/image";

export const ImageWithFallback = ({
  src,
  alt,
  height,
  width,
  ...props
}: Props) => {
  const [error, setError] = useState(false);

  return (
    <Image
      height={height}
      width={width}
      onError={() => setError(true)}
      src={error ? fallbackImage : src}
      alt={error ? "Placeholder image" : alt}
      {...props}
    />
  );
};

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

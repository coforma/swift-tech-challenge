import { useEffect, useState } from "react";
import fallbackImage from "../../assets/default-institution-image.png";
import Image from "next/image";

export const ImageWithFallback = ({
  src,
  alt,
  height,
  width,
  ...props
}: Props) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      height={height}
      width={width}
      onError={setError}
      src={error ? fallbackImage : src}
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

import Image from "next/image";

const Logo = () => {
  return <Image src="/logo.webp" alt="logo" width={384} height={96} className="my-8" />;
};

export default Logo;

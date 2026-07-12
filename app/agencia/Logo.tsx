import Image from "next/image";

export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo-luiz.png"
      alt="Luiz — Digital Marketing"
      width={799}
      height={250}
      priority
      className={`h-20 w-auto sm:h-24 ${className}`}
    />
  );
}

"use client";
import Image from "next/image";
const Avatar = () => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      src="/avatar.jpg"
    />
  );
};

export default Avatar;

"use client";

import Image from "next/image";

const WebImgGroup: React.FC = () => {
  const images = [
    {
      src: "/docs/resource/jpg_img.jpg",
      alt: "jpg",
      size: "483KB",
      format: "JPG",
    },
    {
      src: "/docs/resource/png_img.png",
      alt: "png",
      size: "2.2MB",
      format: "PNG",
    },
    {
      src: "/docs/resource/webp_img.webp",
      alt: "webp",
      size: "126KB",
      format: "WebP",
    },
    {
      src: "/docs/resource/gif_img.gif",
      alt: "gif",
      size: "780KB",
      format: "GIF",
    },
    {
      src: "/docs/resource/svg_img.svg",
      alt: "svg",
      size: "2.7MB",
      format: "SVG",
    },
  ];

  return (
    <div className="card grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {images.map((image, index) => (
        <div
          key={index + image.alt}
          className="card border border-gray-200 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={500}
            height={300}
            className="rounded-lg w-full h-auto object-cover mb-4"
          />
          <p className="text-center text-sm font-medium">
            {image.format} - {image.size}
          </p>
        </div>
      ))}
      <div className="card border border-gray-200 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
        <Image
          src={"/docs/resource/webp_img.webp"}
          alt={"webp"}
          width={500}
          height={500}
          className="rounded-lg w-full h-auto object-cover mb-4"
        />
        <p className="text-center text-sm font-medium">
          Next Image - 懒加载、压缩、优化
        </p>
      </div>
    </div>
  );
};

export default WebImgGroup;

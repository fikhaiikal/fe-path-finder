import Image from "next/image";

export default function AuthLayout({ children, title, description }) {
  return (
    <div className="min-h-screen flex">
      {/* Kiri: Gambar & branding */}
      <div className="hidden md:flex w-1/2 relative items-center justify-center bg-[#0B2447]">
        <div className="absolute inset-0">
          <Image
            src="/office-bg.png"
            alt="Office Background"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-[#0B2447] opacity-60" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-10">
          <div className="flex items-center mb-4">
            <Image src="/pathfinder-logo.png" alt="Logo" width={300} height={300} />
          </div>
          <p className="text-white text-lg font-light italic text-center">
            Discover Careers, Unleash Potential
          </p>
        </div>
      </div>
      {/* Kanan: Form */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          {title && <h2 className="text-2xl font-bold mb-2 text-gray-900">{title}</h2>}
          {description && <p className="mb-6 text-gray-500">{description}</p>}
          {children}
        </div>
      </div>
    </div>
  );
} 
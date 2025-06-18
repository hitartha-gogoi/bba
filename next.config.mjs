/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost", "res.cloudinary.com", "babahadurgarh.com", "via.placeholder.com","bahadurgarh.s3.eu-north-1.amazonaws.com"], // ✅ Allow external images from GitHub
      },
};

export default nextConfig;

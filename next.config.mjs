/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost", "res.cloudinary.com", "img.freepik.com", "babahadurgarh.com", "apple.com", "www.azuki.com", "expo.dev"], // ✅ Allow external images from GitHub
      },
};

export default nextConfig;

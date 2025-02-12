export const fetchUrl =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api"
        : "https://next-blog-cj.vercel.app/api";
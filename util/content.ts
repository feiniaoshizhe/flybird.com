import fs from "fs";
import path from "path";
import matter from "gray-matter";

function getMDXFiles(dir: string) {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: fs.PathOrFileDescriptor) {
    let rawContent = fs.readFileSync(filePath, "utf-8")
    return matter(rawContent)
}

function getMDXData(dir: string) {
    let mdxFiles = getMDXFiles(dir);

    return mdxFiles.map((file) => {
        let { data: metadata, content } = readMDXFile(path.join(dir, file));
        let slug = path.basename(file, path.extname(file));

        return {
            metadata,
            slug,
            content,
        };
    });
}

export default function getPosts(category: string) {
    return getMDXData(path.join(process.cwd(), "content", category));
}
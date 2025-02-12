// import { notFound } from "next/navigation";
// // import { allProjects } from "contentlayer/generated";
// import { Mdx } from "@/app/components/mdx";
// import { Header } from "./header";
// import "./mdx.css";
// import { ReportView } from "./view";
// import getPosts from "@/util/content";

import ReportViews from "@/app/components/view";
import getPosts from "@/util/content";
import { notFound } from "next/navigation";

// export const revalidate = 60;

// type Props = {
//   params: {
//     slug: string;
//   };
// };

// // const redis = Redis.fromEnv();

// export async function generateStaticParams(): Promise<Props["params"][]> {
//   let allProjects = getPosts("projects");
//   return allProjects
//     .filter((p) => p.metadata.published)
//     .map((p) => ({
//       slug: p.slug,
//     }));
// }

// export default async function PostPage({ params }: Props) {
//   const slug = params?.slug;
//   const project = getPosts("projects").find((project) => project.slug === slug);

//   if (!project) {
//     notFound();
//   }

//   const views = 0;
//   // (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

//   return (
//     <div className="bg-zinc-50 min-h-screen">
//       <Header project={project} views={views} />
//       <ReportView slug={project.slug} />

//       <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
//         <Mdx code={project.content} />
//       </article>
//     </div>
//   );
// }

export default async function Page({
  params,
}: {
  params: { category: string; slug: string };
}) {
  let post = getPosts(params.category).find(
    (post) => post.slug === params.slug
  );

  if (!post) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.metadata.category}/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Coding Jitsu Blog",
            },
          }),
        }}
      />
      <ReportViews
        category={post.metadata.category}
        title={post.metadata.title}
        slug={post.slug}
      />
      <Header>
        <Container>
          <BreadcrumbWithCustomSeparator
            category={post.metadata.category}
            slug={post.slug}
          />
          <h1 className="title font-semibold text-2xl tracking-tighter mt-4">
            {post.metadata.title}
          </h1>
          <div className="flex justify-between items-center mt-2 mb-4 text-sm">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
              {formatDate(post.metadata.publishedAt)}
            </p>
          </div>
        </Container>
      </Header>
      <Container>
        <article className="prose">
          <CustomMDX source={post.content} />
        </article>
      </Container>
    </>
  );
}

import Link from "next/link";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";
import { Article } from "../components/article";
import { Eye } from "lucide-react";
import getPosts from "@/util/content";
import { notFound } from "next/navigation";

export default async function BlogPage() {
  const allProjects = getPosts("blog")
    .filter((p) => p.metadata.published)
    .sort(
      (a, b) =>
        new Date(b.metadata.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.metadata.date ?? Number.POSITIVE_INFINITY).getTime()
    );

  if (!allProjects.length) {
    notFound();
  }

  const [top1, top2, top3] = allProjects.slice(0, 3);
  const sorted = allProjects.slice(3);

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Blog
          </h2>
          <p className="mt-4 text-zinc-400">
            The books I have been reading recently.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
          {top1 && (
            <Card>
              <Link href={`/projects/${top1.slug}`}>
                <article className="relative w-full h-full p-4 md:p-8">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs text-zinc-100">
                      {top1.metadata.date ? (
                        <time
                          dateTime={new Date(top1.metadata.date).toISOString()}
                        >
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: "medium",
                          }).format(new Date(top1.metadata.date))}
                        </time>
                      ) : (
                        <span>SOON</span>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <Eye className="w-4 h-4" />{" "}
                      {Intl.NumberFormat("en-US", {
                        notation: "compact",
                      }).format(
                        0 // views[top1.slug] ?? 0
                      )}
                    </span>
                  </div>

                  <h2
                    id="featured-post"
                    className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                  >
                    {top1.metadata.title}
                  </h2>
                  <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                    {top1.metadata.description}
                  </p>
                  <div className="absolute bottom-4 md:bottom-8">
                    <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                      Read more <span aria-hidden="true">&rarr;</span>
                    </p>
                  </div>
                </article>
              </Link>
            </Card>
          )}

          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
            {top2 && (
              <Card key={top2.slug}>
                <Article project={top2} views={0} />
              </Card>
            )}
            {top3 && (
              <Card key={top3.slug}>
                <Article project={top3} views={0} />
              </Card>
            )}
          </div>
        </div>
        <div className="hidden w-full h-px md:block bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={0} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

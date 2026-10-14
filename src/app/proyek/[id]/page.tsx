import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/app/data/project";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getProject(id: string) {
  return projects.find((project) => project.id === Number(id));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const project = getProject(id);

  if (!project) {
    return {
      title: "Project Not Found | Shintya",
      description: "Project yang dicari tidak ditemukan.",
    };
  }

  return {
    title: `${project.title} | Shintya`,
    description: project.description,

    openGraph: {
      title: `${project.title} | Shintya`,
      description: project.description,
      type: "website",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const project = getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#080808] px-6 py-24 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-8 inline-block text-fuchsia-400 transition hover:text-fuchsia-300"
        >
          ← Back to Home
        </Link>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-fuchsia-400">
            {project.category}
          </p>

          <h1 className="mb-5 text-4xl font-bold md:text-5xl">
            {project.title}
          </h1>

          <p className="text-lg leading-relaxed text-zinc-400">
            {project.description}
          </p>
        </div>
      </div>
    </main>
  );
}
import ProjectList from "../components/ProjectList";

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6">
      <div className="py-12">
        <h1 className="text-4xl font-bold">
          My Projects
        </h1>

        <p className="mt-2 text-gray-600">
          Berikut beberapa proyek yang telah saya kerjakan.
        </p>
      </div>

      <ProjectList />
    </main>
  );
}
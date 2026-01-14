// Utility to load project markdown via Vite's glob
export const projectsGlob = import.meta.glob('../content/projects/*.md', { eager: true });

export function getAllProjects() {
  return Object.entries(projectsGlob)
    .map(([path, mod]: any) => {
      const slug = path.split('/').pop()!.replace('.md', '');
      const data = (mod as any).frontmatter ?? {};
      return { slug, ...data, Content: (mod as any).default };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProjectBySlug(slug: string) {
  const projects = getAllProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

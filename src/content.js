const modules = import.meta.glob("./content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true
});

function slugFromPath(path) {
  return path.split("/").pop().replace(/\.md$/, "");
}

function parseFrontmatter(raw) {
  if (!raw.startsWith("---")) {
    return { data: {}, content: raw };
  }

  const endIndex = raw.indexOf("\n---", 3);
  if (endIndex === -1) {
    return { data: {}, content: raw };
  }

  const frontmatterBlock = raw.slice(3, endIndex).trim();
  const content = raw.slice(endIndex + 4).trim();
  const data = {};

  frontmatterBlock.split("\n").forEach((line) => {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) return;

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (value === "true") value = true;
    if (value === "false") value = false;

    data[key] = value;
  });

  return { data, content };
}

export function getAllPosts() {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const { data, content } = parseFrontmatter(raw);
      return {
        slug: data.slug || slugFromPath(path),
        title: data.title || "Bài viết",
        excerpt: data.excerpt || "",
        cover: data.cover || "/assets/hero-rebar.jpg",
        category: data.category || "Tin tức",
        topic: data.topic || "phan-hoi",
        featured: Boolean(data.featured),
        date: data.date || "2026-01-01",
        content
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  return getAllPosts().find((post) => post.slug === slug);
}

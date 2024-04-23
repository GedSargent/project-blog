import BlogHero from "@/components/BlogHero";
import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";

async function BlogPost({ params }) {
  const { postSlug } = params;
  const post = await loadBlogPost(postSlug);

  console.log({ post });

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
      />
      <div className={styles.page}>{<MDXRemote source={post.content} />}</div>
    </article>
  );
}

export default BlogPost;

import BlogHero from "@/components/BlogHero";
import CodeSnippet from "@/components/CodeSnippet";
import Spinner from "@/components/Spinner";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import dynamic from "next/dynamic";
import styles from "./postSlug.module.css";

const DivisionGroupsDemo = dynamic(
  () => import("@/components/DivisionGroupsDemo"),
  { loading: Spinner }
);

const CircularColorsDemo = dynamic(
  () => import("@/components/CircularColorsDemo"),
  { loading: Spinner }
);

export async function generateMetadata({ params }) {
  const { postSlug } = params;
  const post = await loadBlogPost(postSlug);

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = params;
  const post = await loadBlogPost(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        {
          <MDXRemote
            source={post.content}
            components={{
              pre: CodeSnippet,
              DivisionGroupsDemo,
              CircularColorsDemo,
            }}
          />
        }
      </div>
    </article>
  );
}

export default BlogPost;

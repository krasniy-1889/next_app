import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout from '@/layouts/layout';
import type { GetServerSideProps } from 'next';
import React from 'react';
import { PostCard } from '@/components/Card';
import { HomeProps, IPost } from '@/types/posts/post.type';
import { Grid, SimpleGrid, rem } from '@mantine/core';

const inter = Inter({ subsets: ['latin'] });

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://127.0.0.1:8000/posts');
  const posts: IPost[] = await res.json();
  return {
    props: {
      posts,
    },
  };
};

const Home = ({ posts }: HomeProps) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <SimpleGrid
          px={5}
          mt={10}
          cols={5}
          breakpoints={[
            {
              maxWidth: 'sm',
              cols: 1,
            },
            {
              maxWidth: 'md',
              cols: 2,
            },
            {
              maxWidth: 'lg',
              cols: 3,
            },
            {
              maxWidth: 'xl',
              cols: 4,
            },
          ]}
        >
          {posts.map((post) => (
            <div>
              {post.title}
              {post.comments &&
                post.comments.map((comment) => (
                  <div>
                    <div>{comment.user.username}</div>
                    <p>{comment.content}</p>
                  </div>
                ))}
            </div>
          ))}
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </SimpleGrid>
      </Layout>
    </>
  );
};

export default Home;

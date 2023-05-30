import { useRouter } from 'next/router';
import Layout from '@/layouts/layout';
import { Button } from '@mantine/core';
import { useSelector } from 'react-redux';
import { wrapper } from '@/store/store';
import { GetServerSideProps } from 'next';
import { useGetRootQuery } from '@/store/api/api';

// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps((store) => async (ctx) => {
//     const [data, isLoading, error] = useGetRootQuery();
//     return { props: { data } };
//   });

const PostById = () => {
  const router = useRouter();
  const { posts }: any = useSelector((state) => state);
  if (posts.length > 2) {
    console.log('asdasdasd');
  } else {
    console.log('asdasdjlaskjdlaksjd');
  }

  console.log(posts);
  return (
    <Layout>
      <Button onClick={() => router.back()}>Back</Button>
      <div>Post {router.query.id}</div>
    </Layout>
  );
};

export default PostById;

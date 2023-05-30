import {CardProps} from '@/types/posts/post.type';
import {
  createStyles,
  Card,
  Image,
  Text,
  Group,
  RingProgress,
  rem,
} from '@mantine/core';
import CommentCard from './CommentCard';
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderTop: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

export function PostCard({post}: CardProps) {
  const {classes} = useStyles();

  return (
      <Card withBorder padding="lg" className={classes.card}>
        <Card.Section>
          <Image
              src={
                'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
              }
              alt='Image'
              height={100}
          />
        </Card.Section>
        <Group position="apart" mt="xl">
          <Link href={{
            pathname: '/post/[id]',
            query: {id: post.id}
          }}>
            <Text fz="sm" fw={700} className={classes.title}>
              {post.title}
            </Text>
          </Link>
        </Group>
        <Text
            mt="sm"
            mb="md"
            c="dimmed"
            fz="xs"
            dangerouslySetInnerHTML={{__html: post.content}}
        ></Text>
        <Card.Section className={classes.footer}>
          <Text size="xs" color="dimmed">
            <span style={{fontWeight: '700'}}>Likes: </span>
            {post.like_count}
          </Text>
          <Text size="xs" color="dimmed">
            <span style={{fontWeight: '700'}}>Comments Count: </span>
            {post.comments_count}
          </Text>
          <Text size="xs" color="dimmed">
            <span style={{fontWeight: '700'}}>Views: </span>
            {post.view_count}
          </Text>
        </Card.Section>
        {post.comments.length > 0 && (
            <>
              <hr/>
              <h3>Comments</h3>
              {post.comments.map((comment) => (
                  <CommentCard comment={comment} key={comment.id}/>
              ))}
            </>
        )}
      </Card>
  );
}

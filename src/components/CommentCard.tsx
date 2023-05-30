import React from 'react';
import { createStyles, Text, Avatar, Group, rem } from '@mantine/core';
import { IComment } from '@/types/posts/post.type';

const useStyles = createStyles((theme) => ({
  body: {
    paddingTop: theme.spacing.sm,
  },
}));

export default function CommentCard({ comment }: { comment: IComment }) {
  const { classes } = useStyles();
  return (
    <div>
      <Group>
        <div>
          <Text size="sm">{comment.user.username}</Text>
          <Text size="xs" color="dimmed">
            {comment.created_at}
          </Text>
        </div>
      </Group>
      <Text className={classes.body} size="sm">
        {comment.content}
      </Text>
      <hr />
    </div>
  );
}

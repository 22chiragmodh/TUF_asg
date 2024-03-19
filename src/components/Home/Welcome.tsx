import { Button, Flex, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import classes from './Welcome.module.css';
import { Link } from 'react-router-dom';

export function Welcome() {
  return (
    <Flex direction="column">
      <motion.div
        initial={{ opacity: 0, translateY: 5 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Flex>
          <Button
            mt={65}
            mx="auto"
            component={Link}
            to="/submissions"
            variant="light"
            size="compact-sm"
          >
            {'Explore Submissions ->'}
          </Button>
        </Flex>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, translateY: 5 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title className={classes.title} ta="center" mt={12} fw={600}>
          Welcome to{' '}
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            TUF Code Sharing
          </Text>{' '}
          Portal
        </Title>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, translateY: 8 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Text c="dimmed" ta="center" size="md" mx="auto" mt="xl">
          Easily share and display your code snippets with the developer community. Submit your work
          and explore the creations of your peers in a streamlined web application.
        </Text>
      </motion.div>
    </Flex>
  );
}

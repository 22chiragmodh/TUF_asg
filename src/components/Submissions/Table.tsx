import { Container, Text, Title, Table, Flex, Pagination, Button, Skeleton } from '@mantine/core';
import { CodeHighlight } from '@mantine/code-highlight';
import { useState } from 'react';
import { useElementSize } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import classes from './Table.module.css';
import { useSnippets } from '@/hooks/snippet.swr';

export function TableComp() {
  const [activePage, setPage] = useState(1);
  const { ref, width } = useElementSize();
  const { snippets, isSnippetsLoading, errorFetchingSnippets } = useSnippets();

  const rows = snippets?.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td>{element.username}</Table.Td>
      <Table.Td>{element.language}</Table.Td>
      <Table.Td>
        <Text lineClamp={1}>{element.stdin || 'N/A'}</Text>
      </Table.Td>
      <Table.Td>{element.createdAt}</Table.Td>
      <Table.Td>
        <Flex direction="column" maw={width} key={width}>
          <CodeHighlight
            withCopyButton={false}
            maw={width}
            code={element.code.slice(0, 100)}
            language={element.language}
            style={{
              borderRadius: '.5rem',
            }}
          />
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Container maw="90%" mb={100}>
      <Flex direction="column" gap={28}>
        <motion.div
          initial={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Flex justify="space-between" align="center" w="100%" mt={32}>
            <Title className={classes.title} ta="center" fw={600}>
              <Text
                inherit
                variant="gradient"
                component="span"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                TUF
              </Text>{' '}
              Submissions
            </Title>
            <Button component={Link} to="/" variant="gradient" size="sm">
              Submit Another
            </Button>
          </Flex>
        </motion.div>
        {isSnippetsLoading ? (
          <Flex direction="column" gap={16}>
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
          </Flex>
        ) : errorFetchingSnippets ? (
          <Text ta="center" color="red">
            {errorFetchingSnippets.message}
          </Text>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Flex
                direction="column"
                style={{
                  borderRadius: '.75rem',
                  border: '1px solid var(--mantine-color-dark-4)',
                }}
              >
                <Table verticalSpacing="sm" horizontalSpacing="md" highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Username</Table.Th>
                      <Table.Th>Language</Table.Th>
                      <Table.Th>Stdin</Table.Th>
                      <Table.Th>Timestamp</Table.Th>
                      <Table.Th ref={ref}>Code</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </Flex>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Flex>
                <Pagination mx="auto" total={100} value={activePage} onChange={setPage} mt="sm" />
              </Flex>
            </motion.div>
          </>
        )}
      </Flex>
    </Container>
  );
}

import { Container, Text, Title, Table, Flex, Pagination, Button } from '@mantine/core';
import { CodeHighlight } from '@mantine/code-highlight';
import { useState } from 'react';
import { useElementSize } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import classes from './Table.module.css';

export function TableComp() {
  const [activePage, setPage] = useState(1);
  const { ref, width } = useElementSize();

  const submissions = [
    {
      username: 'Alice99',
      preferredCodeLanguage: 'javascript',
      stdin: 'Enter input values',
      code: "console.log('Hello from JS');",
      timestamp: '2023-04-10T08:20:00Z',
    },
    {
      username: 'CodeMaster',
      preferredCodeLanguage: 'java',
      stdin: 'Input for Java code',
      code: "System.out.println('Hello from Java');",
      timestamp: '2023-04-10T09:00:00Z',
    },
    {
      username: 'PythonGuru',
      preferredCodeLanguage: 'python',
      stdin: 'Python script inputs',
      code: "print('Hello from Python')",
      timestamp: '2023-04-10T09:30:00Z',
    },
    {
      username: 'C_Connoisseur',
      preferredCodeLanguage: 'c',
      stdin: '',
      code: "#include <stdio.h>\nint main() { printf('Hello, World!\\n'); return 0; }",
      timestamp: '2023-04-10T10:00:00Z',
    },
    {
      username: 'CppDev',
      preferredCodeLanguage: 'cpp',
      stdin: 'Test input for C++',
      code: "#include <iostream>\nint main() { std::cout << 'Hello, C++!' << std::endl; return 0; }",
      timestamp: '2023-04-10T10:15:00Z',
    },
    {
      username: 'SharpShooter',
      preferredCodeLanguage: 'csharp',
      stdin: 'C# console input',
      code: "using System;\nclass Program { static void Main() { Console.WriteLine('Hello, C#!'); } }",
      timestamp: '2023-04-10T10:45:00Z',
    },
    {
      username: 'TSAdvocate',
      preferredCodeLanguage: 'typescript',
      stdin: '',
      code: "console.log('Greetings from TypeScript');",
      timestamp: '2023-04-10T11:10:00Z',
    },
    {
      username: 'NullTerminator',
      preferredCodeLanguage: 'c',
      stdin: 'C language stdin',
      code: "#include <stdio.h>\nint main() { puts('Goodbye, World!'); return 0; }",
      timestamp: '2023-04-10T11:30:00Z',
    },
    {
      username: 'JSDynamo',
      preferredCodeLanguage: 'javascript',
      stdin: '',
      code: "document.getElementById('demo').innerHTML = 'Hello JavaScript!';",
      timestamp: '2023-04-10T12:05:00Z',
    },
    {
      username: 'JavaBean',
      preferredCodeLanguage: 'java',
      stdin: 'Java application input',
      code: "class HelloWorld { public static void main(String[] args) { System.out.println('Hello, Java!'); } }",
      timestamp: '2023-04-10T12:45:00Z',
    },
  ];

  const rows = submissions.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td>{element.username}</Table.Td>
      <Table.Td>{element.preferredCodeLanguage}</Table.Td>
      <Table.Td>
        <Text lineClamp={1}>{element.stdin || 'N/A'}</Text>
      </Table.Td>
      <Table.Td>{element.timestamp}</Table.Td>
      <Table.Td>
        <Flex direction="column" maw={width} key={width}>
          <CodeHighlight
            withCopyButton={false}
            maw={width}
            code={element.code.slice(0, 100)}
            language={element.preferredCodeLanguage}
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
      </Flex>
    </Container>
  );
}

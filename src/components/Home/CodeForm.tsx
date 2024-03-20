import React from 'react';
import Editor from 'react-simple-code-editor';
// @ts-ignore
import { highlight, languages } from 'prismjs/components/prism-core';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import useSWRMutation from 'swr/mutation';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-funky.css'; //Example style, you can use another
import { motion } from 'framer-motion';
import { Button, Flex, ScrollArea, Select, Text, Textarea, TextInput, Title } from '@mantine/core';
import { useForm, isNotEmpty } from '@mantine/form';
import styles from './CodeForm.module.css';
import { API_CONSTANTS } from '@/utils/api.constants';
import { genericMutationFetcher } from '@/utils/swr.helper';

const languageOptions = [
  {
    label: 'JavaScript',
    value: 'javascript',
  },
  {
    label: 'TypeScript',
    value: 'typescript',
  },
  {
    label: 'Python',
    value: 'python',
  },
  {
    label: 'C',
    value: 'c',
  },
  {
    label: 'C++',
    value: 'cpp',
  },
  {
    label: 'C#',
    value: 'csharp',
  },
  {
    label: 'Java',
    value: 'java',
  },
];

const languageToPrism = {
  javascript: languages.javascript,
  typescript: languages.typescript,
  c: languages.clike,
  cpp: languages.clike,
  csharp: languages.clike,
  python: languages.python,
  java: languages.java,
};

interface IFormValues {
  username: string;
  preferredCodeLanguage: string;
  stdin: string;
}

export function CodeForm() {
  const [code, setCode] = React.useState('');
  const navigate = useNavigate(0);
  const { trigger, isMutating } = useSWRMutation(
    API_CONSTANTS.SUBMIT_SNIPPET,
    genericMutationFetcher
  );
  const form = useForm<IFormValues>({
    initialValues: {
      username: '',
      preferredCodeLanguage: languageOptions[0].value,
      stdin: '',
    },

    validate: {
      username: isNotEmpty('Username is required'),
      preferredCodeLanguage: isNotEmpty('Language is required'),
    },
  });

  const handleSubmit = async (values: IFormValues) => {
    try {
      await trigger({
        type: 'post',
        rest: [
          {
            username: values.username,
            language: values.preferredCodeLanguage,
            stdin: values.stdin,
            code,
          },
        ],
      });
      navigate('/submissions');
      notifications.show({
        title: 'Code submitted successfully',
        message: 'Check your submissions',
      });
    } catch (error) {
      console.error('Error submitting code', error);
      notifications.show({
        title: 'Error submitting code',
        message: 'Please try again',
        color: 'red',
      });
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.75 }}
    >
      <Flex
        direction="column"
        gap={24}
        align="center"
        bg="dark.6"
        style={{
          borderRadius: '1rem',
          border: '1px solid var(--mantine-color-dark-4)',
        }}
        w="100%"
        maw={600}
        mx="auto"
        py={60}
        px={40}
        mt={50}
        mb={100}
      >
        <Title order={2}>Submit your code</Title>
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          style={{
            width: '100%',
          }}
        >
          <Flex direction="column" gap={12}>
            <TextInput
              withAsterisk
              label="Username"
              placeholder="Enter your username"
              {...form.getInputProps('username')}
            />

            <Select
              data={languageOptions}
              label="Language"
              placeholder="Select language"
              {...form.getInputProps('preferredCodeLanguage')}
            />
            <Textarea
              label="Stdin"
              placeholder="Enter your stdin"
              {...form.getInputProps('stdin')}
            />
            <Flex direction="column">
              <Text size="sm" fw={500}>
                Code
              </Text>
              <ScrollArea.Autosize
                mah={400}
                w="100%"
                mx="auto"
                p={8}
                style={{
                  borderRadius: '.75rem',
                  border: '1px solid var(--mantine-color-dark-4)',
                }}
                className={styles.codeWrapper}
              >
                <Editor
                  value={code}
                  onValueChange={setCode}
                  highlight={(codeStr) =>
                    highlight(
                      codeStr,
                      languageToPrism[
                        form.values.preferredCodeLanguage as keyof typeof languageToPrism
                      ]
                    )
                  }
                  padding={10}
                  placeholder="Your code here..."
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                    border: 'none !important',
                    outline: 'none',
                    width: '100%',
                  }}
                  className={styles.code}
                  required
                />
              </ScrollArea.Autosize>
            </Flex>
            <Button size="md" variant="gradient" mt={12} type="submit">
              Submit
            </Button>
          </Flex>
        </form>
      </Flex>
    </motion.div>
  );
}

import { Container } from '@mantine/core';
import { Welcome } from '../components/Home/Welcome';
import { CodeForm } from '@/components/Home/CodeForm';

export function HomePage() {
  return (
    <Container>
      <Welcome />
      <CodeForm />
    </Container>
  );
}

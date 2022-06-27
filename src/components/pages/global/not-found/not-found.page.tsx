import { AppContainer, AppLayout } from '@project/components';
import { accessTokenOperations } from '@project/services';

const NotFoundPage = () => {
  const isAuthenticated = accessTokenOperations.get();

  const Content = () => (
    <AppContainer>
      <p>404 Not Found</p>
    </AppContainer>
  );

  if (isAuthenticated) {
    return (
      <AppLayout>
        <Content />
      </AppLayout>
    );
  }

  return <Content />;
};

export default NotFoundPage;

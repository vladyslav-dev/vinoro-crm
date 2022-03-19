import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination: '/home',
      permanent: true,
    },
  };
};

export default getStaticProps;
/* eslint-disable react-hooks/exhaustive-deps */
import '@/styles/reset.scss';
import '@/styles/font.scss';
import '@/styles/index.scss';
import React, { useEffect } from "react"
import { AppProps, AppContext } from 'next/app';
import NProgress from 'nprogress';
import Router, { useRouter } from 'next/router';
import AuthService from '@/services/AuthService';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, setUser } from '@/slices/auth';
import { setProducts, setCategory } from '@/slices/search';
import { Provider } from "react-redux";
import store, { RootState } from '@/store/index';
import Dashboard from '@/layouts/Dashboard';
import Loader from '@/components/UI/Loader';
import useSWR from 'swr';
import ProductService from '@/services/ProductService';
import CategoryService from '@/services/CategoryService';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface MyAppProps extends AppProps {}
interface InnerAppProps {
  children: React.ReactNode;
}

const InnerApp: React.FC<InnerAppProps> = ({ children }) => {

  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: RootState) => state.authReducer);

  const { data: swrSearchProducts } = useSWR(`GET-SEARCH-PRODUCTS`, async () => await ProductService.getSearchProducts());
  const { data: swrSearchCategory } = useSWR(`GET-SEARCH-CATEGORY`, async () => await CategoryService.getSearchCategory());

  useEffect(() => {
    dispatch(setProducts(swrSearchProducts));
    dispatch(setCategory(swrSearchCategory));
  }, [swrSearchProducts, swrSearchCategory])

  useEffect(() => {
    if (localStorage.getItem("user:token")) {
      AuthService.checkAuth()
        .then((result: any) => {
          setTimeout(() => {
            dispatch(setAuth(true));
            dispatch(setUser(result?.data?.user));
            localStorage.setItem('user:token', result?.data?.accessToken);
          }, 1500)
        })
        .catch(() => {
          localStorage.removeItem('user:token');
          dispatch(setAuth(false));
          console.error('Token is not define, Unauthorized')
        })
    } else {
      setTimeout(() => {
        dispatch(setAuth(false));
    }, 1500)
      console.error('Token is not define, Unauthorized')
    }
  }, [])

  useEffect(() => {
      if (!isAuth) {
        router.push('/login')
      }
    }, [isAuth])

    if (isAuth === null) {
        return <Loader />
    } else if (isAuth) {
        return <Dashboard>{children}</Dashboard>
    } else {
        return <>{children}</>
    }
}

const MyApp = (props: MyAppProps) => (
  <Provider store={store}>
    <InnerApp>
      <props.Component {...props.pageProps} />
    </InnerApp>
  </Provider>
)
// MyApp.getInitialProps = async ({ Component, router, ctx }: AppContext) => {

//   const pageContext = { ...ctx };
//   const pageProps = Component.getInitialProps ? await Component.getInitialProps(pageContext) : {};

//   return {
//     ...pageProps,
//   }
// }



export default MyApp

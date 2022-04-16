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
import { Provider } from "react-redux";
import store, { RootState } from '@/store/index';
import Dashboard from '@/layouts/Dashboard';
import Loader from '@/components/Loader';

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

  useEffect(() => {
    const slowLoad = window.setTimeout(function() {
      console.log( "the page is taking its sweet time loading" );
    }, 10 );

    window.addEventListener('load', function() {
        window.clearTimeout( slowLoad );
    }, false );
  }, [])

  useEffect(() => {
    if (localStorage.getItem("user:token")) {
      AuthService.checkAuth()
        .then((result: any) => {
          console.log('check auth true')
          setTimeout(() => {
            dispatch(setAuth(true));
            dispatch(setUser(result?.data?.user));
            localStorage.setItem('user:token', result?.data?.accessToken);
          }, 2000)
        })
        .catch((err: any) => {
          localStorage.removeItem('user:token');
          dispatch(setAuth(false));
          console.log(err)
        })
    } else {
      setTimeout(() => {
        dispatch(setAuth(false));
    }, 2000)
      console.log('Token is not define, Unauthorized')
    }
  }, [])

  useEffect(() => {
    if (!isAuth) {
      console.log('router push to login page')
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

const MyApp = (props: MyAppProps) => {

  return (
    <Provider store={store}>
      <InnerApp>
        <props.Component {...props.pageProps} />
      </InnerApp>
    </Provider>

  )
}

MyApp.getInitialProps = async ({ Component, router, ctx }: AppContext) => {

  const pageContext = { ...ctx };
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(pageContext) : {};

  return {
    ...pageProps,
  }
}



export default MyApp

import { Redirect } from 'umi'

export default (props:any) => {

  const  isLogin  = false;
  if (isLogin) {
    return <div>{ props.children }</div>;
  } else {
    return <Redirect to="/login" />;
  }
}
import dynamic from 'next/dynamic'

const NoSsr = ({children}: any): JSX.Element => {
  return (
    <>
      {children}
    </>
  );
};

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false
})

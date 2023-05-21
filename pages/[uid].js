function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export default UserIdPage;

// getServerSideProps는 요청이 있을 때마다 해당 요청에 따른 로직을 수행한다.
// 고로, getStaticPaths와 같은 메서드 없이도 동적인 routing이 가능하다.
export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: "userid-" + userId,
    },
  };
}

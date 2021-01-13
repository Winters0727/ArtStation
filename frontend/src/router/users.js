const routes = [
    {
        path : '/user/:userNickname',
        name : 'MyPage',
        component : () => import('@/views/users/MyPage')
    },
  ]
  
  export default routes
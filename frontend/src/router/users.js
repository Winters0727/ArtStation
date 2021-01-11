const routes = [
    {
        path : '/user/:userNickname',
        name : 'UserGallery',
        component : () => import('@/views/users/UserGallery')
    },
  ]
  
  export default routes
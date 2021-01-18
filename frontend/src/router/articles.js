import PictureDetail from '@/views/articles/PictureDetail'
import UploadPicture from '@/views/articles/UploadPicture'

const routes = [
    {
        path : '/detail',
        name : 'PictureDetail',
        component : PictureDetail,
        props : true,
    },
    {
        path : '/upload',
        name : 'UploadPicture',
        component : UploadPicture
    },
  ]
  
  export default routes
  
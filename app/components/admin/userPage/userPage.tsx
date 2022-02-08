import {useCallback, useEffect, useState} from "react";
import {DropZone} from "../dropZone";
import {ImageListType} from "react-images-uploading/dist/typings";
import Image from "next/image";
import { Point, Area } from "react-easy-crop/types";

import {getCroppedImg} from "../../../utils/canvas.utils";
import {UserPageProps} from "./userPage.props";
import {useActions} from "../../../hooks/useActions";
import {IBreadcrumbs} from "../../../types/breadcrumbs.types";
import {useGetUserQuery, useUploadPhotoMutation} from "../../../store/users/users.api";
import {CircleLoader, CircleTypes} from "../../loaders";
import styles from './userPage.module.scss';
import Input from "../../input";
import {Textarea} from "../../textarea";
import {IUser} from "../../../types/auth.types";
import {ImageCrop} from "../imageCrop";

const emptyUser: IUser = {
  "id": "6cc11beb-6c5b-4bb0-a385-b2d2174d5c56",
  "email": "qa@m.com",
  "name": "Ramis",
  "role": "user",
  "phone": "89084856999",
  "description": "Тапки и вино",
  "logo": {
    "url": "logos/1639658626221Gv5tC8B-Hsk.jpg",
    "name": "1639658626221Gv5tC8B-Hsk.jpg"
  },
  "department": {
    "id": "12bb20bc-fd8a-44df-ab8b-e173b8daf1bb",
    "name": "video",
    "description": "Устройства в московском офисе направления видео наблюдения"
  }
}

const imgPrefix = process.env.NEXT_PUBLIC_API_URL + '/static/'

export const UserPage = ({id}: UserPageProps): JSX.Element => {
  const [images, setImages] = useState<ImageListType>([]);
  const {setBreadcrumbs} = useActions()
  const {data, isLoading, error} = useGetUserQuery(id)
  const [upload, {data: imgUrl}] = useUploadPhotoMutation()
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        images[0].data_url,
        croppedAreaPixels!,
        0
      )
      const fd = new FormData()
      fd.append('file', croppedImage!)
      upload(fd)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, images, upload])

  useEffect(() => {
    const lastBreadcrumb = id === 'edit'
      ? {route: '/admin/users/edit', pathName: 'Создание пользователя', isLast: true}
      : {route: `/admin/users/${id}`, pathName: `Редактирование пользователя ${id}`, isLast: true}
    const breadcrumbs: IBreadcrumbs[] = [
      {route: '/', pathName: 'Главная'},
      {route: '/admin', pathName: 'Админка'},
      {route: '/admin/users', pathName: 'Пользователи'},
    ]
    setBreadcrumbs([...breadcrumbs, lastBreadcrumb]);
  }, [id, setBreadcrumbs])

  const onImageUpload = (imageList: ImageListType, addUpdateIndex?: number[]) => {
    setImages(imageList);
  };

  if (isLoading) {
    return <CircleLoader type={CircleTypes.dark}/>
  }

  return (
    <div>
      Страница пользователя: {id}
      <div className={styles.container}>
        <div className={styles.block}>
          <Input handleChange={() => {}} label='Имя пользователя' type="text"/>
          <Textarea onChange={() => {}} label='Описание пользователя' defaultValue="Описание пользователя"/>
          <DropZone images={images} onImageUpload={onImageUpload}/>
          {images && images.length > 0 && images[0].data_url
          && <ImageCrop
            image={images[0].data_url}
            onCropComplete={onCropComplete}
            showCroppedImage={showCroppedImage} />
          }
        </div>
        <div className={styles.block}>
          <Input handleChange={() => {}} label='email' type="email"/>
          {imgUrl && <Image width={200} height={200} src={imgPrefix + imgUrl.url} alt="avatar"/>}
        </div>
      </div>
    </div>
  )
}


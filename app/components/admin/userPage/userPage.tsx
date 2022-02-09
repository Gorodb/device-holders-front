import {ChangeEvent, ChangeEventHandler, useCallback, useEffect, useState} from "react";
import {DropZone} from "../dropZone";
import {ImageListType} from "react-images-uploading/dist/typings";
import Image from "next/image";
import { Area } from "react-easy-crop/types";

import {getCroppedImg} from "../../../utils/canvas.utils";
import {UserPageProps} from "./userPage.props";
import {useActions} from "../../../hooks/useActions";
import {IBreadcrumbs} from "../../../types/breadcrumbs.types";
import {useGetUserQuery, useUploadPhotoMutation} from "../../../store/users/users.api";
import {CircleLoader, CircleTypes} from "../../loaders";
import styles from './userPage.module.scss';
import {Textarea, Input, Select} from "../../htmlTags";
import {IUser} from "../../../types/auth.types";
import {ImageCrop} from "../imageCrop";
import AdminSelect from "../adminSelect";

const imgPrefix = process.env.NEXT_PUBLIC_API_URL + '/static/'

export const UserPage = ({id}: UserPageProps): JSX.Element => {
  const [user, setUser] = useState<IUser>({
    "id": "",
    "email": "",
    "name": "",
    "role": "",
    "phone": "",
    "description": "",
    "logo": {"url": "", "name": ""},
    "department": {"id": "", "name": "", "description": ""}
  })
  const [images, setImages] = useState<ImageListType>([]);
  const {setBreadcrumbs} = useActions()
  const {data, isSuccess, isLoading, error} = useGetUserQuery(id)
  const [upload, {data: imgUrl}] = useUploadPhotoMutation()
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  useEffect(() => {
    if (data && isSuccess) {
      setUser(data)
    }
  }, [isSuccess, data])

  console.log(user)

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

  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setUser({...user, [event.target.name]: event.target.value})
  }

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setUser({...user, [event.target.name]: event.target.value})
  }

  const onChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    setUser({...user, [event.target.name]: event.target.value})
  }

  return (
    <div>
      Страница пользователя: {id}
      <div className={styles.container}>
        <div className={styles.block}>
          <Input
            name="name"
            onChange={onChangeInput}
            label='Имя пользователя'
            type="text"
            value={user.name || ""}
            placeholder="Введите имя пользователя"
          />
          <Textarea
            name="description"
            onChange={onChangeTextArea}
            label='Описание пользователя'
            value={user.description || ""}
            placeholder="Введите описание пользователя"
          />
          <DropZone images={images} onImageUpload={onImageUpload}/>
          <button onClick={() => setImages([])}>Remove</button>
          {images && images.length > 0 && images[0].data_url &&
            <ImageCrop
              image={images[0].data_url}
              onCropComplete={onCropComplete}
              showCroppedImage={showCroppedImage}
            />
          }
        </div>
        <div className={styles.block}>
          <form autoComplete="off">
            <Input
              name="phone"
              value={user.phone || ""}
              onChange={onChangeInput}
              label='Телефон'
              type="text"
              placeholder="Введите номер пользователя"
            />
            <Input
              name="email"
              autoComplete="new-password"
              value={user.email || ""}
              onChange={onChangeInput}
              label='Email'
              type="email"
              placeholder="Введите email"
            />
            <Input
              name="password"
              autoComplete="new-password"
              onChange={onChangeInput}
              label='Пароль'
              type="password"
              placeholder="Введите пароль"
            />
            <AdminSelect
              name="role"
              label="Тип учетной записи"
              className={styles.select}
              value={user.role || 'user'}
              onChange={onChangeSelect}
            >
              <option value={'user'}>Пользователь</option>
              <option value={'admin'}>Админ</option>
            </AdminSelect>
          </form>
          {imgUrl && <Image width={200} height={200} src={imgPrefix + imgUrl.url} alt="avatar"/>}
        </div>
      </div>
    </div>
  )
}


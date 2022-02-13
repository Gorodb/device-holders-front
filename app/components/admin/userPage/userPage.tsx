import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {DropZone} from "../dropZone";
import {ImageListType} from "react-images-uploading/dist/typings";
import Image from "next/image";
import {Area} from "react-easy-crop/types";
import {useRouter} from "next/router";

import {getCroppedImg} from "../../../utils/canvas.utils";
import {UserPageProps} from "./userPage.props";
import {useActions} from "../../../hooks/useActions";
import {IBreadcrumbs} from "../../../types/breadcrumbs.types";
import {
  useCreateUsersMutation,
  useLazyGetUserQuery,
  useUpdateUsersMutation,
  useUploadPhotoMutation
} from "../../../store/users/users.api";
import {CircleLoader, CircleTypes} from "../../loaders";
import {Button, ButtonTypes, Input, Textarea} from "../../htmlTags";
import {IUserCreate} from "../../../types/auth.types";
import {ImageCrop} from "../imageCrop";
import AdminSelect from "../adminSelect";
import {useDepartmentsOptions} from "../../../hooks/useDepartmentsOptions";
import styles from './userPage.module.scss';
import {AlertsTypesEnum} from "../../../store/alerts/alerts.slice";
import {useAlerts} from "../../../hooks/useAlerts";

const imgPrefix = process.env.NEXT_PUBLIC_API_URL + '/static/'
const emptyUser = {
  "id": "",
  "email": "",
  "name": "",
  "role": "user",
  "phone": "",
  "description": "",
  "logo": null,
  "department": "",
  "password": "",
  "location": ""
};

export const UserPage = ({id}: UserPageProps): JSX.Element => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [user, setUser] = useState<IUserCreate>(emptyUser)
  const [imageUploadError, setImageUploadError] = useState<any>(null)
  const [images, setImages] = useState<ImageListType>([]);
  const {setBreadcrumbs} = useActions()
  const setAlert = useAlerts()
  const [getUser, {data, isSuccess, isLoading, error}] = useLazyGetUserQuery()
  const [upload, {data: imgUploadData, isSuccess: isSuccessUpload}] = useUploadPhotoMutation()
  const [updateUser, {isSuccess: isUserUpdated, isError: isErrorUserUpdate, error: updateError}] = useUpdateUsersMutation()
  const [createUser, {data: createdUser, isSuccess: isUserCreated, isError: isErrorUserCreate, error: createUserError}] = useCreateUsersMutation()
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const {options, data: departments, isSuccess: isDepartmentsSuccess} = useDepartmentsOptions({page: 1, limit: 1000})
  const router = useRouter()

  useEffect(() => {
    if (id && id !== 'create') {
      getUser(id)
    } else if (isDepartmentsSuccess && departments) {
      setUser({...user, department: departments.items[0].id})
    }
  }, [departments, getUser, id, isDepartmentsSuccess])

  useEffect(() => {
    if (isUserUpdated) {
      setAlert({text: 'Пользователь сохранен', type: AlertsTypesEnum.success}, 3000)
    }
    if (isErrorUserUpdate && updateError) {
      setAlert({text: `Не удалось обновить пользователя: ${id}`, type: AlertsTypesEnum.error}, 3000)
    }
    if (isUserCreated) {
      setAlert({text: 'Пользователь создан', type: AlertsTypesEnum.success}, 3000)
      router.push(`/admin/users/${createdUser.id}`)
    }
    if (isErrorUserCreate && createUserError) {
      // @ts-ignore
      const text = typeof createUserError.data.message === 'string'
        // @ts-ignore
        ? createUserError.data.message
        // @ts-ignore
        : createUserError.data.message.map((error: string, inx: number) => <div key={inx}>{error}</div>)
      setAlert({text, type: AlertsTypesEnum.error}, 10000)
    }
  }, [isUserCreated, createUserError, isErrorUserCreate, updateError, isErrorUserUpdate, isUserUpdated])

  useEffect(() => {
    if (data && isSuccess && !isLoading) {
      data.department
        ? setUser({...data, department: data.department.id})
        : setUser({...data, department: ""})
    }
  }, [isSuccess, data, isLoading])

  useEffect(() => {
    if (!user.department || !user.name || !user.email) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [data, user])

  useEffect(() => {
    if (imgUploadData && isSuccessUpload) {
      setUser({...user, logo: imgUploadData})
      setAlert({text: 'Изображение загружено', type: AlertsTypesEnum.success}, 3000)
    }
  }, [imgUploadData, isSuccessUpload])

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(images[0].data_url, croppedAreaPixels!, 0)
      upload(croppedImage!)
      setImages([])
    } catch (err) {
      setImageUploadError(err)
    }
  }, [croppedAreaPixels, images, upload])

  useEffect(() => {
    const lastBreadcrumb = id === 'create'
      ? {route: '/admin/users/create', pathName: 'Создание пользователя', isLast: true}
      : {route: `/admin/users/${id}`, pathName: `Редактирование пользователя ${id}`, isLast: true}
    const breadcrumbs: IBreadcrumbs[] = [
      {route: '/', pathName: 'Главная'},
      {route: '/admin', pathName: 'Админка'},
      {route: '/admin/users', pathName: 'Пользователи'},
    ]
    setBreadcrumbs([...breadcrumbs, lastBreadcrumb]);
  }, [id, setBreadcrumbs])

  const onPasswordInputClear = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const userWithoutPassword = user
    delete userWithoutPassword.password
    setUser(userWithoutPassword)
  }

  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setUser({...user, [event.target.name]: event.target.value})
  }

  const onDepartmentSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setUser({...user, department: event.target.value})
  }

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setUser({...user, [event.target.name]: event.target.value})
  }

  const onChangePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const newPassword = event.target.value;
    const userWithoutPassword = user
    delete userWithoutPassword.password
    newPassword ? setUser({...user, password: newPassword}) : setUser(userWithoutPassword)
  }

  const onChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    setUser({...user, [event.target.name]: event.target.value})
  }

  if (isLoading) {
    return <CircleLoader type={CircleTypes.dark}/>
  }

  if (error) {
    return <div>Что-то пошло не так...</div>
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.block}>
          <Input
            name="name"
            onClear={() => setUser({...user, name: ""})}
            onChange={onChangeInput}
            label='Имя пользователя'
            type="text"
            value={user.name || ""}
            placeholder="Введите имя пользователя"
          />
          <Input
            name="location"
            onClear={() => setUser({...user, location: ""})}
            onChange={onChangeInput}
            label='Расположение пользователя'
            type="text"
            value={user.location || ""}
            placeholder="Введите место расположения"
          />
          <Textarea
            name="description"
            onChange={onChangeTextArea}
            label='Описание пользователя'
            value={user.description || ""}
            placeholder="Введите описание пользователя"
          />
          {
            user.logo && user.logo !== {} &&
            <div className={styles.avatarContainer}>
              <div>Аватар пользователя</div>
              <div className={styles.avatar}>
                <Image width={200} height={200} src={imgPrefix + user.logo.url} alt="avatar"/>
                <div className={styles.loadAnother} onClick={() => {
                  setImages([])
                  setUser({...user, logo: null})
                }}/>
              </div>
            </div>
          }
          {
            !images.length && !user.logo && <DropZone
              dropZoneText="Перетащите сюда изображение или кликнете для выбора"
              value={images}
              onChange={(imageList: ImageListType) => setImages(imageList)}
            />
          }
          {
            images && images.length > 0 && images[0].data_url &&
            <>
              <ImageCrop
                image={images[0].data_url}
                onCropComplete={onCropComplete}
              />
              <div className={styles.imageCropButtonsContainer}>
                <Button buttonType={ButtonTypes.black} onClick={showCroppedImage}>Загрузить изображение</Button>
                <Button buttonType={ButtonTypes.error} onClick={() => setImages([])}>Удалить изображение</Button>
                {imageUploadError && <div className={styles.uploadError}>{imageUploadError}</div>}
              </div>
            </>
          }
        </div>
        <div className={styles.rightColumn}>
          <form autoComplete="off" className={styles.form}>
            <Input
              name="phone"
              value={user.phone || ""}
              onChange={onChangeInput}
              onClear={() => setUser({...user, phone: ""})}
              label='Телефон'
              type="text"
              placeholder="Введите номер пользователя"
            />
            <Input
              name="email"
              autoComplete="new-password"
              value={user.email || ""}
              onChange={onChangeInput}
              onClear={() => setUser({...user, email: ""})}
              label='Email'
              type="email"
              placeholder="Введите email"
            />
            <Input
              name="password"
              autoComplete="new-password"
              onChange={onChangePasswordInput}
              onClear={onPasswordInputClear}
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
            {options && <AdminSelect
              label="Подразделение"
              selectedValue={user.department}
              onChange={onDepartmentSelect}
            >{options}</AdminSelect>}
          </form>
        </div>
      </div>
      <div className={styles.buttonsBlock}>
        <Button buttonType={ButtonTypes.black} isDisabled={isDisabled} onClick={() => {
          if (id !== 'create') {
            updateUser(user)
          } else {
            createUser(user)
          }
        }}>Сохранить</Button>
        <Button buttonType={ButtonTypes.white} onClick={() => router.push("/admin/users")}>Отмена</Button>
      </div>
    </div>
  )
}


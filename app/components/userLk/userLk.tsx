import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {DropZone} from "../admin/dropZone";
import {ImageListType} from "react-images-uploading/dist/typings";
import Image from "next/image";
import {Area} from "react-easy-crop/types";
import {useRouter} from "next/router";

import {getCroppedImg} from "../../utils/canvas.utils";
import {useUpdateCurrentMutation, useUploadPhotoMutation,} from "../../store/users/users.api";
import {useLazyUserInfoQuery} from "../../store/auth/auth.api";
import {Button, ButtonTypes, Input, Textarea} from "../htmlTags";
import {ICurrentUserUpdate} from "../../types/auth.types";
import {ImageCrop} from "../admin/imageCrop";
import AdminSelect from "../admin/adminSelect";
import {useDepartmentsOptions} from "../../hooks/useDepartmentsOptions";
import styles from './userLk.module.scss';
import {AlertsTypesEnum} from "../../store/alerts/alerts.slice";
import {useAlerts} from "../../hooks/useAlerts";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {CircleLoader, CircleTypes} from "../loaders";

const imgPrefix = process.env.NEXT_PUBLIC_IMG_URL;

export const UserLk = (): JSX.Element => {
  const user = useTypedSelector(store => store.auth.user)
  const [changedUser, setChangedUser] = useState<ICurrentUserUpdate>({
    id: "",
    email: "",
    name: "",
    location: "",
    phone: "",
    description: "",
    department: "",
    logo: null
  })
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [imageUploadError, setImageUploadError] = useState<any>(null)
  const [images, setImages] = useState<ImageListType>([]);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const setAlert = useAlerts()
  const [upload, {data: imgUploadData, isSuccess: isSuccessUpload}] = useUploadPhotoMutation()
  const [updateUser, {isSuccess: isUserUpdated, isError: isErrorUserUpdate, error: updateError}] = useUpdateCurrentMutation()
  const [userInfo] = useLazyUserInfoQuery()
  const {options} = useDepartmentsOptions({page: 1, limit: 1000})
  const router = useRouter()

  useEffect(() => {
    if (user) {
      const department = user.department?.id
      setChangedUser({...user, department})
    }
  }, [user])

  useEffect(() => {
    if (isUserUpdated) {
      setAlert({text: 'Пользовательские данные сохранены', type: AlertsTypesEnum.success}, 3000)
    } else if (isErrorUserUpdate && updateError) {
      setAlert({text: `Проблемы при обновлении: `, type: AlertsTypesEnum.error}, 3000)
    }
  }, [isErrorUserUpdate, isUserUpdated, setAlert, updateError])

  useEffect(() => {
    if (isUserUpdated) {
      userInfo("")
    }
  }, [isUserUpdated, userInfo])

  useEffect(() => {
    setIsDisabled(!changedUser.department || !changedUser.name || !changedUser.email)
  }, [changedUser])

  useEffect(() => {
    if (imgUploadData && isSuccessUpload) {
      setChangedUser({...changedUser, logo: imgUploadData})
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

  const onDepartmentSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    const department = event.target.value ? event.target.value : ""
    setChangedUser({...changedUser, department})
  }

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setChangedUser({...changedUser, [event.target.name]: event.target.value})
  }

  const onChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    setChangedUser({...changedUser, [event.target.name]: event.target.value})
  }

  if (!user) {
    return <CircleLoader type={CircleTypes.dark} />
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.block}>
          <Input
            name="name"
            onClear={() => setChangedUser({...changedUser, name: ""})}
            onChange={onChangeInput}
            label='Имя пользователя'
            type="text"
            value={changedUser.name || ""}
            placeholder="Введите имя пользователя"
            isRequired={true}
          />
          <Input
            name="location"
            onClear={() => setChangedUser({...changedUser, location: ""})}
            onChange={onChangeInput}
            label='Расположение пользователя'
            type="text"
            value={changedUser.location || ""}
            placeholder="Введите место расположения"
          />
          <Textarea
            name="description"
            onChange={onChangeTextArea}
            label='Описание пользователя'
            value={changedUser.description || ""}
            placeholder="Введите описание пользователя"
          />
          {
            changedUser.logo &&
            <div className={styles.avatarContainer}>
              <div>Аватар пользователя</div>
              <div className={styles.avatar}>
                <Image width={200} height={200} src={imgPrefix + changedUser.logo.url} alt="avatar"/>
                <div className={styles.loadAnother} onClick={() => {
                  setImages([])
                  setChangedUser({...changedUser, logo: null})
                }}/>
              </div>
            </div>
          }
          {
            !images.length && !changedUser.logo && <DropZone
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
              value={changedUser.phone || ""}
              onChange={onChangeInput}
              onClear={() => setChangedUser({...changedUser, phone: null})}
              label='Телефон'
              type="text"
              placeholder="Введите номер пользователя"
            />
            <Input
              name="email"
              autoComplete="new-password"
              value={changedUser.email || ""}
              onChange={onChangeInput}
              onClear={() => setChangedUser({...changedUser, email: ""})}
              label='Email'
              type="email"
              isRequired={true}
            />
            {options && <AdminSelect
              label="Подразделение"
              value={changedUser.department || ""}
              onChange={onDepartmentSelect}
              defaultOptionText="Выбор подразделения"
              isRequired={true}
            >{options}</AdminSelect>}
          </form>
        </div>
      </div>
      <div className={styles.buttonsBlock}>
        <Button buttonType={ButtonTypes.black} isDisabled={isDisabled} onClick={() => updateUser(changedUser)}>Сохранить</Button>
        <Button buttonType={ButtonTypes.white} onClick={() => router.push("/")}>К списку устройств</Button>
      </div>
    </div>
  )
}

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
import NoSsr from "../NoSsr/noSsr";

const imgPrefix = process.env.NEXT_PUBLIC_API_URL + '/static/'
const emptyUser = {
  "id": "",
  "email": "",
  "name": "",
  "role": "user",
  "phone": null,
  "description": "",
  "logo": undefined,
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
  const [updateUser, {
    isSuccess: isUserUpdated,
    isError: isErrorUserUpdate,
    error: updateError
  }] = useUpdateUsersMutation()
  const [createUser, {
    data: createdUser,
    isSuccess: isUserCreated,
    isError: isErrorUserCreate,
    error: createUserError
  }] = useCreateUsersMutation()
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const {options, data: departments, isSuccess: isDepartmentsSuccess} = useDepartmentsOptions({page: 1, limit: 1000})
  const router = useRouter()

  useEffect(() => {
    if (id && id !== 'create') {
      getUser(id)
    }
  }, [departments, getUser, id, isDepartmentsSuccess])

  useEffect(() => {
    if (isUserUpdated) {
      setAlert({text: '???????????????????????? ????????????????', type: AlertsTypesEnum.success}, 3000)
    } else if (isErrorUserUpdate && updateError) {
      setAlert({text: `???? ?????????????? ???????????????? ????????????????????????: ${id}`, type: AlertsTypesEnum.error}, 3000)
    } else if (isUserCreated) {
      setAlert({text: '???????????????????????? ????????????', type: AlertsTypesEnum.success}, 3000)
      router.push(`/admin/users/${createdUser.id}`)
    } else if (isErrorUserCreate && createUserError) {
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
    !user.department || !user.name || !user.email
      ? setIsDisabled(true)
      : id === 'create' && !user.password
        ? setIsDisabled(true)
        : setIsDisabled(false)
  }, [data, id, user])

  useEffect(() => {
    if (imgUploadData && isSuccessUpload) {
      setUser({...user, logo: imgUploadData})
      setAlert({text: '?????????????????????? ??????????????????', type: AlertsTypesEnum.success}, 3000)
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
      ? {route: '/admin/users/create', pathName: '???????????????? ????????????????????????', isLast: true}
      : {route: `/admin/users/${id}`, pathName: `???????????????????????????? ???????????????????????? ${id}`, isLast: true}
    const breadcrumbs: IBreadcrumbs[] = [
      {route: '/', pathName: '??????????????'},
      {route: '/admin', pathName: '??????????????'},
      {route: '/admin/users', pathName: '????????????????????????'},
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
    const department = event.target.value ? event.target.value : ""
    setUser({...user, department})
  }

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setUser({...user, [event.target.name]: event.target.value})
  }

  const onChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const phone = event.target.value ? event.target.value : null
    setUser({...user, phone})
  }

  const onChangePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const newPassword = event.target.value;
    const userWithoutPassword = {...user}
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
    return <div>??????-???? ?????????? ???? ??????...</div>
  }

  return (
    <NoSsr>
      <div>
        <div className={styles.container}>
          <div className={styles.block}>
            <Input
              name="name"
              onClear={() => setUser({...user, name: ""})}
              onChange={onChangeInput}
              label='?????? ????????????????????????'
              type="text"
              value={user.name || ""}
              placeholder="?????????????? ?????? ????????????????????????"
              isRequired={true}
            />
            <Input
              name="location"
              onClear={() => setUser({...user, location: ""})}
              onChange={onChangeInput}
              label='???????????????????????? ????????????????????????'
              type="text"
              value={user.location || ""}
              placeholder="?????????????? ?????????? ????????????????????????"
            />
            <Textarea
              name="description"
              onChange={onChangeTextArea}
              label='???????????????? ????????????????????????'
              value={user.description || ""}
              placeholder="?????????????? ???????????????? ????????????????????????"
            />
            {
              user.logo &&
              <div className={styles.avatarContainer}>
                <div>???????????? ????????????????????????</div>
                <div className={styles.avatar}>
                  <img className={styles.image} src={imgPrefix + user.logo.url} alt="avatar"/>
                  <div className={styles.loadAnother} onClick={() => {
                    setImages([])
                    setUser({...user, logo: undefined})
                  }}/>
                </div>
              </div>
            }
            {
              !images.length && !user.logo && <DropZone
                dropZoneText="???????????????????? ???????? ?????????????????????? ?????? ???????????????? ?????? ????????????"
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
                  <Button buttonType={ButtonTypes.black} onClick={showCroppedImage}>?????????????????? ??????????????????????</Button>
                  <Button buttonType={ButtonTypes.error} onClick={() => setImages([])}>?????????????? ??????????????????????</Button>
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
                onChange={onChangePhone}
                onClear={() => setUser({...user, phone: null})}
                label='??????????????'
                type="text"
                placeholder="?????????????? ?????????? ????????????????????????"
              />
              <Input
                name="email"
                autoComplete="new-password"
                value={user.email || ""}
                onChange={onChangeInput}
                onClear={() => setUser({...user, email: ""})}
                label='Email'
                type="email"
                placeholder="?????????????? email"
                isRequired={true}
              />
              <Input
                name="password"
                autoComplete="new-password"
                onChange={onChangePasswordInput}
                onClear={onPasswordInputClear}
                label='????????????'
                type="password"
                placeholder="?????????????? ????????????"
                isRequired={id === 'create' && !user.password}
              />
              <AdminSelect
                name="role"
                label="?????? ?????????????? ????????????"
                className={styles.select}
                value={user.role}
                onChange={onChangeSelect}
              >
                <option value={'user'}>????????????????????????</option>
                <option value={'admin'}>??????????</option>
              </AdminSelect>
              {options && <AdminSelect
                label="??????????????????????????"
                value={user.department}
                onChange={onDepartmentSelect}
                defaultOptionText="?????????? ??????????????????????????"
                isRequired={true}
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
          }}>??????????????????</Button>
          <Button buttonType={ButtonTypes.white} onClick={() => router.push("/admin/users")}>????????????</Button>
        </div>
      </div>
    </NoSsr>
  )
}


import Image from "next/image";
import {DropZoneProps} from "./dropZone.props";
import ImageUploading from "react-images-uploading";
import {inspect} from "util";
import styles from "./dropZone.module.scss"

export const DropZone = ({images, onImageUpload, ...props}: DropZoneProps): JSX.Element => {
  return (
    <div className="App">
      <ImageUploading
        value={images!}
        onChange={onImageUpload}
        dataURLKey="data_url"
      >
        {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <div className={styles.imageContainer}>
                  {/*<img src={image['data_url']} alt="" />*/}
                </div>
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  )
}

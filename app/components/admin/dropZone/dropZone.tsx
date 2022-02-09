import cn from "classnames";
import {DropZoneProps} from "./dropZone.props";
import ImageUploading from "react-images-uploading";
import styles from "./dropZone.module.scss"

export const DropZone = ({images, onImageUpload, ...props}: DropZoneProps): JSX.Element => {
  return (
    <div className="App" {...props}>
      <ImageUploading value={images!} onChange={onImageUpload} dataURLKey="data_url">
        {({
            onImageUpload,
            isDragging,
            dragProps,
          }) => (
          <div>
            <button
              className={cn(styles.dragContainer, {
                [styles.dragging]: isDragging
              })}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
          </div>
        )}
      </ImageUploading>
    </div>
  )
}

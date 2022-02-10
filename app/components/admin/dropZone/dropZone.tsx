import cn from "classnames";
import {DropZoneProps} from "./dropZone.props";
import ImageUploading from "react-images-uploading";
import styles from "./dropZone.module.scss"

export const DropZone = ({dropZoneText, ...props}: DropZoneProps): JSX.Element => {
  return (
    <div className="App" >
      <ImageUploading {...props} acceptType={["png","jpg","jpeg","webp"]} dataURLKey="data_url" >
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
              {dropZoneText ? dropZoneText : "Click or Drop here"}
            </button>
          </div>
        )}
      </ImageUploading>
    </div>
  )
}

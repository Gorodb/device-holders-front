import {ImageCropProps} from "./imageCrop.props";
import styles from "./imageCrop.module.scss"
import Cropper from "react-easy-crop";
import {useState} from "react";
import {Point} from "react-easy-crop/types";

export const ImageCrop = ({image, onCropComplete, ...props}: ImageCropProps): JSX.Element => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)

  return (
    <div className="App" {...props}>
      <div className={styles.cropContainer}>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          maxZoom={3}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="controls">
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setZoom(parseInt(e.target.value))
          }}
          className="zoom-range"
        />
      </div>
    </div>
  )
}

import {useState, useEffect} from "react";
import {MdClose} from "react-icons/md";

import styles from './modal.module.scss'
import {Button, ButtonTypes} from "../htmlTags";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {emptyModal} from "../../store/modal/modal.slice";

export const Modal = (): JSX.Element => {
  const [isBrowser, setIsBrowser] = useState(false);
  const {setModalIsOpen, setModal} = useActions()
  const isOpen = useTypedSelector(state => state.modal.isOpen)
  const modal = useTypedSelector(state => state.modal.modal)

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 27 /*esc*/) {
      setModalIsOpen(false)
    }
  }

  const handleCloseClick = () => {
    setModal(emptyModal);
    setModalIsOpen(false);
  };

  if (isBrowser && modal !== emptyModal) {
    const {title, subtitle, buttonText, onClick} = modal;
    return isOpen && (
      <div className={styles.modal} onKeyDown={handleKeyDown}>
        <div className={styles.overlay} onClick={handleCloseClick}/>
        <div className={styles.modalContainer}>
          <div className={styles.close}>
            <MdClose onClick={handleCloseClick} />
          </div>
          <div className={styles.modalContent}>
            <span className={styles.title}>{title}</span>
            <span className={styles.message}>{subtitle}</span>
            <div >
              <Button buttonType={ButtonTypes.black} onClick={onClick}>{buttonText}</Button>
              <Button buttonType={ButtonTypes.transparent} onClick={handleCloseClick}>Отмена</Button>
            </div>
          </div>
        </div>
      </div>
    ) || <></>
  }

  return <></>
}

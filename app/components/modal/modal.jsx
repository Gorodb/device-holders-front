import {useEffect} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {createStructuredSelector} from "reselect";

import {closeModal} from "../../redux/modal/modal.actions"
import {selectIsOpen, selectModalData, selectModalTypes} from "../../redux/modal/modal.selectors";
import {deleteProject} from "../../redux/projects/projects.utils"
import {deleteGroup} from "../../redux/groups/groups.utils";

import classes from './Modal.module.scss'
import {CloseButton} from "../buttons"
import DeleteModal from "./DeleteModal";

const Modal = ({isOpen, modalTypes, modal, closeModal, deleteGroup, deleteProject}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style['overflow-y'] = 'hidden'
      document.body.style['padding-right'] = 'calc(100vw - 100%)'
    }
    return () => {
      document.body.style['overflow-y'] = 'auto'
      document.body.style['padding-right'] = 0
    }
  }, [isOpen])

  const handleKeyDown = (event) => {
    if (event.keyCode === 27 /*esc*/) {
      closeModal()
    }
  }

  const switchModal = () => {
    switch (modal.modalType) {
      case (modalTypes.projectDelete):
        return <DeleteModal modal={modal} deleteFunction={deleteProject} />;
      case (modalTypes.groupDelete):
        return <DeleteModal modal={modal} deleteFunction={deleteGroup} />
      default:
        return;
    }
  }

  const modalContent = (
    <div className={classes.modal} onKeyDown={handleKeyDown}>
      <div className={classes.overlay} onClick={closeModal}/>
      <div className={classes['modal-container']}>
        <div className={classes.close}>
          <CloseButton onClick={closeModal}/>
        </div>
        {switchModal()}
      </div>
    </div>
  )

  return isOpen ? modalContent : null
}

const mapStateToProps = createStructuredSelector({
  isOpen: selectIsOpen,
  modal: selectModalData,
  modalTypes: selectModalTypes
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({closeModal, deleteProject, deleteGroup}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)

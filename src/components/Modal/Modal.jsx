import { useEffect } from 'react';
import css from './Modal.module.css';



export const Modal = ({ modalPhoto, modalBackdropClick, handleKeyDown }) => {
    
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    return (
        <div className={css.Overlay} onClick={modalBackdropClick}>
            <div className={css.Modal}>
                <img src={modalPhoto} alt="" />
            </div>
        </div>
    )
}
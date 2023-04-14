import { useDispatch } from "react-redux";
import { deleteSpotThunk } from "../../store/spots";
import { useModal } from "../../context/Modal";
import "./Modals.css";

const DeleteSpotModal = ({ spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const onClick = async (e) => {
    e.preventDefault();
    dispatch(deleteSpotThunk(spotId)).then(closeModal);
  };

  const doNothing = async (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <>
      <div className="delete-spot-modal">
        <h1>Confirm Delete</h1>
        <h4>Are you sure you want to remove this spot from the listings?</h4>
        <div className="delete-modal-buttons">
        <button className="delmodal yes-delete-button" onClick={onClick}>
          Yes (Delete Spot)
        </button>
        <button className="delmodal no-delete-button" onClick={doNothing}>No (Keep Spot)</button>
        </div>
      </div>
    </>
  );
};

export default DeleteSpotModal;

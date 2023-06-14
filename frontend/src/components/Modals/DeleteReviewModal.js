import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./Modals.css";
import { deleteReviewThunk } from "../../store/reviews";
import { getSpotDetailThunk } from "../../store/spots";

const DeleteReviewModal = ({ reviewId, spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const onClick = async (e) => {
    e.preventDefault();
    dispatch(deleteReviewThunk(reviewId)).then(
      closeModal,
      dispatch(getSpotDetailThunk(spotId))
    );
  };

  const doNothing = async (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <>
      <div className="delete-spot-modal">
        <h1>Confirm Delete</h1>
        <h4>Are you sure you want to delete this review?</h4>
        <div className="delete-modal-buttons">
          <button className="delmodal yes-delete-button" onClick={onClick}>
            Yes (Delete Review)
          </button>
          <button className="delmodal no-delete-button" onClick={doNothing}>
            No (Keep Review)
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteReviewModal;

import './pulse.css';
interface Props {
  handleOpenChatFrame: () => void;
}
function ChatButton({handleOpenChatFrame}: Props) {
  return (
    <div className="d-flex justify-content-end">
        <button type="button" className="rounded-circle btn btn-lg pulse" onClick={handleOpenChatFrame}>
            <span className=" fs-1 bi bi-messenger icon-pulse-color"></span>
        </button>
    </div>
  );
}

export default ChatButton;

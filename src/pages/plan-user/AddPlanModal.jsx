export default function AddPlanModal() {
    return (
        <dialog
            id="add_plan_modal"
            className="modal modal-bottom sm:modal-middle"
        >
            <div className="modal-box text-secondary">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">
                    Press ESC key or click the button below to close
                </p>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}

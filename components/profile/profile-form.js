import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm({ handleChangePassword }) {
  const newPasswordInputRef = useRef(null);
  const oldPasswordInputRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const newPassword = newPasswordInputRef.current.value;
    const oldPassword = oldPasswordInputRef.current.value;

    if (!newPassword.trim() || !oldPassword.trim()) {
      return;
    }

    await handleChangePassword({
      oldPassword,
      newPassword,
    });

    newPasswordInputRef.current.value = "";
    oldPasswordInputRef.current.value = "";
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;

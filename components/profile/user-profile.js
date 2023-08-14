import axios from "axios";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  async function handleChangePassword(passwordData) {
    try {
      await axios.patch("/api/user/change-password", passwordData);
    } catch {
      throw new Error("Couldn't update password.");
    }
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm handleChangePassword={handleChangePassword} />
    </section>
  );
}

export default UserProfile;

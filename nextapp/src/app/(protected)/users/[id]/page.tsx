"use client";

import { useEffect, useState } from "react";
import { InfoItem } from "@/components/InfoItem/InfoItem";
import { UserSection } from "@/components/UserSection/UserSection";
import { useUserContext } from "@/hooks/useUserContext";
import { IUser } from "@/types/User";
import { copyLink } from "@/utils/copyLink";
import { TEditableUserData, useEditUserFields } from "@/utils/editUserFields";
import { handleFieldChange } from "@/utils/handleFieldChange";
import { useGetSingleUserQuery } from "@/features/user/usersApiSlice";
import { formatDate } from "@/utils/formatDate";
import { formatDateForInput } from "@/utils/formatDateForInput";
import { normalizeVisaData } from "@/utils/normalizeVisaData"; // transforms visa data into usable format
import { GENERAL_FIELDS, CONTACT_FIELDS, TRAVEL_FIELDS } from "@/utils/fields"; // field arrays to reduce HTML duplication
import { NotFound } from "@/components/NotFound/NotFound";
import { canUserEdit } from "@/utils/canUserEdit"; // checks if user is admin or HR
import styles from "./page.module.scss";
import { useRouter, useParams } from "next/navigation";

const UserDetailsPage = () => {
  const params = useParams();
  const id = params.id as string | undefined;
  const router = useRouter();
  const { user: currentUser, loading: loadingCurrent } = useUserContext();
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [originalUser, setOriginalUser] = useState<IUser | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Use RTK query to fetch user by id
  const {
    data: fetchedUser,
    isLoading: loadingUser,
    error,
  } = useGetSingleUserQuery(id || "", { skip: !id });
  const editUserFields = useEditUserFields();
  const [saving, setSaving] = useState(false);

  // Normalize and set user data when fetched
  useEffect(() => {
    if (fetchedUser) {
      const normalized = normalizeVisaData({ ...fetchedUser });
      setUserInfo(normalized);
      setOriginalUser(normalized);
      setNotFound(false);
    } else if (error || (!loadingUser && !fetchedUser && id)) {
      setNotFound(true);
    }
  }, [fetchedUser, error, loadingUser, id]);

  // call util
  const canEdit = canUserEdit(currentUser, userInfo);

  // handle field changes with an util
  const onFieldChange = (
    field: keyof TEditableUserData | "manager_name",
    value: string
  ) => {
    if (!isEditing || !userInfo) return;
    // if editing is cancelled return previous info
    const updatedUser = handleFieldChange(userInfo, field, value);
    setUserInfo(updatedUser);
  };

  // start edit mode
  const handleStartEdit = () => {
    if (!userInfo || !canEdit) return;
    setOriginalUser(userInfo);
    setIsEditing(true);
  };

  // cancel edit mode
  const handleCancel = () => {
    if (originalUser) {
      setUserInfo(originalUser);
    }
    setIsEditing(false);
  };

  // call updateFields util to update the user details
  const handleSave = async () => {
    if (!userInfo || !id) return; // if id or userinfo is missing return
    setSaving(true); // enable saving
    const data: TEditableUserData = {
      department: userInfo.department,
      building: userInfo.building,
      room: userInfo.room,
      desk_number: userInfo.desk_number,
      date_birth: userInfo.date_birth,
      phone: userInfo.phone,
      email: userInfo.email,
      skype: userInfo.skype,
      cnumber: userInfo.cnumber,
      citizenship: userInfo.citizenship,
      visa1: userInfo.visa1,
      visa1_period: userInfo.visa1_period,
      visa2: userInfo.visa2,
      visa2_period: userInfo.visa2_period,
      manager: userInfo.manager,
    };

    // call our util to set updated fields n make a call to backend
    await editUserFields(Number(id), data);
    setIsEditing(false); // once that runs disable edit mode
    setOriginalUser(userInfo);

    // finally disable saving
    setSaving(false);
  };

  // display loading while fetching or while user info is not ready
  if (
    (loadingUser || loadingCurrent || (!notFound && !userInfo)) &&
    !notFound
  ) {
    return (
      <main className="user-profile page--fade-in">
        <p>Loading...</p>
      </main>
    );
  }

  // 404 page if not found
  if (notFound) {
    return (
      <main className="user-profile page--fade-in">
        <NotFound />
      </main>
    );
  }

  // extra guard for ts complaining
  if (!userInfo) {
    return null;
  }

  // to display remote icon if user is remote
  const remote = !!userInfo?.isRemoteWork;

  return (
    <>
      <main className={`page--fade-in ${styles["user-profile"]}`}>
        <div className={styles["user-profile__layout"]}>
          <aside className={styles["user-profile__sidebar"]}>
            <button
              type="button"
              className={styles["user-profile__back"]}
              onClick={() => router.back()}
            >
              <img src="/assets/chevron-left.svg" alt="back" />
            </button>

            <div className={styles["user-profile__card"]}>
              <div className={styles["user-profile__avatar-wrapper"]}>
                <img
                  src={userInfo.user_avatar}
                  alt="profile"
                  className={styles["user-profile__card-image"]}
                />

                {remote && (
                  <img
                    src="/assets/home.png"
                    alt="remote-badge"
                    className={styles["user-profile__remote-badge"]}
                    style={{ display: "block" }}
                  />
                )}
              </div>

              <h1 className={styles["user-profile__card-name"]}>
                {userInfo.first_name} {userInfo.last_name}
              </h1>

              <p className={styles["user-profile__card-subtitle"]}>
                {userInfo.first_native_name} {userInfo.middle_native_name || ""}{" "}
                {userInfo.last_native_name}
              </p>

              <button
                type="button"
                className={styles["user-profile__card-copy"]}
                onClick={() => copyLink(window.location.href)}
              >
                <img src="/assets/copy.png" alt="copy" /> Copy link
              </button>

              {canEdit && (
                <div className={styles["user-profile__card-actions"]}>
                  <button
                    type="button"
                    className={`${styles["user-profile__card-edit"]} ${
                      isEditing ? styles["user-profile__card-edit--active"] : ""
                    }`}
                    onClick={isEditing ? handleSave : handleStartEdit}
                    disabled={saving}
                  >
                    {isEditing ? (
                      "SAVE"
                    ) : (
                      <img src="/assets/pen.png" alt="edit" />
                    )}
                    {!isEditing && " EDIT"}
                  </button>

                  <button
                    type="button"
                    className={styles["user-profile__card-cancel"]}
                    style={{ display: isEditing ? "flex" : "none" }}
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    CANCEL
                  </button>
                </div>
              )}
            </div>
          </aside>

          <section className={styles["user-profile__details"]}>
            {/* GENERAL FIELDS ROW */}
            <UserSection title="GENERAL INFO">
              {GENERAL_FIELDS.map(({ field, icon, label }) => (
                <InfoItem
                  key={field}
                  icon={icon}
                  label={label}
                  value={String(userInfo[field])}
                  editable={isEditing}
                  onChange={(value) =>
                    onFieldChange(field as keyof TEditableUserData, value)
                  }
                  dataField={field}
                />
              ))}

              <InfoItem
                icon="/assets/calendar-alt.png"
                label="Date of birth"
                value={
                  isEditing
                    ? formatDateForInput(userInfo.date_birth)
                    : formatDate(userInfo.date_birth)
                }
                editable={isEditing}
                onChange={(value) =>
                  onFieldChange("date_birth" as keyof TEditableUserData, value)
                }
                dataField="date_birth"
                inputType={isEditing ? "date" : "text"}
              />

              <InfoItem
                icon="/assets/user.png"
                label="Manager"
                value={`${userInfo.manager.first_name} ${userInfo.manager.last_name}`}
                editable={isEditing}
                onChange={(value) =>
                  onFieldChange(
                    "manager_name" as keyof TEditableUserData,
                    value
                  )
                }
                dataField="manager_name"
              />
            </UserSection>

            {/* CONTACT FIELDS ROW */}
            <UserSection title="CONTACTS">
              {CONTACT_FIELDS.map(({ field, icon, label, link }) => (
                <InfoItem
                  key={field}
                  icon={icon}
                  label={label}
                  value={String(userInfo[field])}
                  editable={isEditing}
                  link={link}
                  onChange={(value) =>
                    onFieldChange(field as keyof TEditableUserData, value)
                  }
                  dataField={field}
                />
              ))}
            </UserSection>

            {/* TRAVEL FIELDS ROW */}
            <UserSection title="TRAVEL INFO">
              {TRAVEL_FIELDS.map(({ field, icon, label, isLast }) => (
                <InfoItem
                  key={field}
                  icon={icon}
                  label={label}
                  value={String(userInfo[field])}
                  editable={isEditing}
                  onChange={(value) =>
                    onFieldChange(field as keyof TEditableUserData, value)
                  }
                  dataField={field}
                  isLast={isLast}
                />
              ))}
            </UserSection>
          </section>
        </div>
      </main>
    </>
  );
};

export default UserDetailsPage;
